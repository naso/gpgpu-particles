import THREE from 'three'
import OrbitControlsModule from 'three-orbit-controls'
import GPUComputationRenderer from 'imports?THREE=three!exports?GPUComputationRenderer!./canvas/libs/GPUComputationRenderer.js'
import SimulationFragmentShader from '../glsl/simulation-fs.glsl'
import ParticlesGeometry from './canvas/particles'

const OrbitControls = OrbitControlsModule(THREE)

class Canvas {

  constructor (bufferDimension, letter) {
    this.bufferWidth = bufferDimension
    this.bufferHeight = bufferDimension
    this.letter = letter
    this.width = window.app.dims.w
    this.height = window.app.dims.h

    this.binds()
    this.bindEvents()

    this.initScene()
    this.initCamera()
    this.initRenderer()
    this.initGPUComputation()
    this.initParticles()
    this.initOrbitControls()

    this.update()
  }

  binds () {
    this.update = this.update.bind(this)
    this.updateDataTexture = this.updateDataTexture.bind(this)
  }

  bindEvents () {
    this.letter.on('update', this.updateDataTexture)
  }

  initScene () {
    this.scene = new THREE.Scene()
  }

  initCamera () {
    this.camera = new THREE.PerspectiveCamera(1, this.width / this.height, 1, 100000)
    this.camera.position.set(0, 0, 4200)
    this.camera.lookAt(this.scene.position)
  }

  initRenderer () {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    this.renderer.setSize(this.width, this.height)
    this.renderer.sortObjects = false
    this.renderer.autoClear = false
    this.element = this.renderer.domElement

    this.clock = new THREE.Clock()
  }

  initGPUComputation () {
    this.gpuCompute = new GPUComputationRenderer(this.bufferWidth, this.bufferHeight, this.renderer)

    this.letter.update('A')

    let error = this.gpuCompute.init()
    if (error !== null) {
      console.error(error)
    }
  }

  updateDataTexture () {
    const width = this.letter.element.width
    const height = this.letter.element.height
    const elevation = 10
    const data = this.getImage(this.letter.element, width, height, elevation)
    const positions = new THREE.DataTexture(data, width, height, THREE.RGBFormat, THREE.FloatType)
    positions.needsUpdate = true

    if (!this.positionVariable) {
      this.positionVariable = this.gpuCompute.addVariable('positions', SimulationFragmentShader, positions)
      this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable])
      this.positionVariable.wrapS = THREE.RepeatWrapping
      this.positionVariable.wrapT = THREE.RepeatWrapping
    } else {
      for (let i = 0; i < (this.bufferWidth * this.bufferHeight) * 3; i++) {
        this.particles.geometry.attributes.oldPos.array[i] = 10
      }

      this.particles.material.uniforms.time.value = 0
      this.particles.geometry.attributes.oldPos.needsUpdate = true

      const currentRenderTarget = this.gpuCompute.getCurrentRenderTarget(this.positionVariable)
      this.positionVariable.material.uniforms.positions.value = positions
      this.gpuCompute.doRenderTarget(this.positionVariable.material, currentRenderTarget)
    }
  }

  initParticles () {
    this.particles = new ParticlesGeometry(this.bufferWidth, this.bufferHeight)
    this.scene.add(this.particles)
  }

  initOrbitControls () {
    this.controls = new OrbitControls(this.camera)
    this.controls.constraint.rotateLeft(50 * Math.PI / 180)
    this.controls.constraint.rotateUp(10 * Math.PI / 180)
    this.controls.update()
  }

  getImage (img, width, height, elevation) {
    let ctx = img.getContext('2d')
    let iData = ctx.getImageData(0, 0, width, height).data

    const l = (width * height)
    const data = new Float32Array(l * 3)
    const _elevation = elevation
    for (let i = 0; i < l; i++) {
      const i3 = i * 3
      const i4 = i * 4

      elevation = Math.random() * _elevation

      data[i3] = ((i % width) / width - 0.5) * width
      data[i3 + 1] = ((i / width) / height - 0.5) * -height
      data[i3 + 2] = (iData[i4] / 0xFF * 0.5) * elevation
    }

    iData = null
    return data
  }

  resize () {
    this.width = window.app.dims.w
    this.height = window.app.dims.h

    this.camera.aspect = this.width / this.height

    this.camera.updateProjectionMatrix()
    this.camera.lookAt(this.scene.position)

    this.renderer.setSize(this.width, this.height)
    this.renderer.render(this.scene, this.camera)
  }

  update () {
    window.requestAnimationFrame(this.update)

    // update the simulation
    this.gpuCompute.compute()

    // update render output
    if (this.positionVariable) {
      this.particles.material.uniforms.time.value++
      this.particles.material.uniforms.positions.value = this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture
    }

    // render the particles at the new location
    this.renderer.render(this.scene, this.camera)
  }
}

export default Canvas
