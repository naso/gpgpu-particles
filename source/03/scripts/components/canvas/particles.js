import THREE from 'three'
import renderVs from '../../glsl/render-vs.glsl'
import renderFs from '../../glsl/render-fs.glsl'

class ParticlesGeometry extends THREE.Points {

  constructor (width, height) {
    const l = (width * height)
    const vertices = new Float32Array(l * 3)

    for (let i = 0; i < l; i++) {
      const i3 = i * 3
      vertices[i3] = (i % width) / width
      vertices[i3 + 1] = (i / width) / height
    }

    const oldPos = new Float32Array(l * 3)

    const geom = new THREE.BufferGeometry()
    geom.addAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geom.addAttribute('oldPos', new THREE.BufferAttribute(oldPos, 3))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        positions: {type: 't', value: null},
        time: {type: 'f', value: 0},
        pointSize: {type: 'f', value: 1 * window.devicePixelRatio}
      },
      vertexShader: renderVs,
      fragmentShader: renderFs,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    super(geom, material)
  }
}

export default ParticlesGeometry
