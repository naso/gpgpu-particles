import THREE from 'three'
import simulationVs from '../../glsl/simulation-vs.glsl'
import simulationFs from '../../glsl/simulation-fs.glsl'
import renderVs from '../../glsl/render-vs.glsl'
import renderFs from '../../glsl/render-fs.glsl'
import FBO from './utils/FBO'

const OrbitControls = require('three-orbit-controls')(THREE)

class Canvas {

  constructor () {
    this.w = window.app.dims.w
    this.h = window.app.dims.h

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(1, this.w / this.h, 1, 10000)
    this.camera.position.set(-4000, -2000, 4000)
    this.camera.lookAt(this.scene.position)
    this.tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov / 2))
    this.windowHeight = window.innerHeight

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(this.w, this.h)
    this.element = this.renderer.domElement

    this.controls = new OrbitControls(this.camera)

    this.init()
  }

  init () {
    window.app.letter.getLetter('B')

    const img = window.app.letter.element
    const width = img.width
    const height = img.height
    const elevation = 30
    const data = this.getImage(img, width, height, elevation)
    const positions = new THREE.DataTexture(data, width, height, THREE.RGBFormat, THREE.FloatType)
    positions.needsUpdate = true

    // this will be used to update the particles positions
    const simulationShader = new THREE.ShaderMaterial({
      uniforms: {
        positions: {
          type: 't',
          value: positions
        }
      },

      vertexShader: simulationVs,
      fragmentShader: simulationFs
    })

    // this will be used to represent the particles on screen
    // note that 'positions' is a texture that will be set and updated during the FBO.update() call
    const renderShader = new THREE.ShaderMaterial({
      uniforms: {
        positions: { type: 't', value: null },
        pointSize: { type: 'f', value: 1 }
      },
      vertexShader: renderVs,
      fragmentShader: renderFs,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    // init the FBO
    this.fbo = new FBO()
    this.fbo.init(width, height, this.renderer, simulationShader, renderShader)
    // this.fbo.particles.rotation.x = (90 * Math.PI) / 180
    this.scene.add(this.fbo.particles)

    this.update = this.update.bind(this)
    this.update()
  }

  getImage (img, width, height, elevation) {
    const ctx = img.getContext('2d')

    const imgData = ctx.getImageData(0, 0, width, height)
    const iData = imgData.data

    const l = (width * height)
    const data = new Float32Array(l * 3)
    for (let i = 0; i < l; i++) {
      const i3 = i * 3
      const i4 = i * 4

      elevation = Math.random() * 30

      data[i3] = ((i % width) / width - 0.5) * width
      data[i3 + 1] = ((i / width) / height - 0.5) * -height
      data[i3 + 2] = (iData[i4] / 0xFF * 0.5) * elevation
    }
    return data
  }

  resize () {
    this.w = window.app.dims.w
    this.h = window.app.dims.h

    this.camera.aspect = this.w / this.h

    this.camera.fov = (360 / Math.PI) * Math.atan(this.tanFOV * (window.innerHeight / this.h))

    this.camera.updateProjectionMatrix()
    this.camera.lookAt(this.scene.position)

    this.renderer.setSize(this.w, this.h)
    this.renderer.render(this.scene, this.camera)
  }

  // update loop
  update () {
    window.requestAnimationFrame(this.update)

    // update the simulation
    this.fbo.update()

    // update mesh
    // this.fbo.particles.rotation.x += Math.PI / 180 * 0.5
    // this.fbo.particles.rotation.y -= Math.PI / 180 * 0.5

    // render the particles at the new location
    this.renderer.render(this.scene, this.camera)
  }
}

export default Canvas
