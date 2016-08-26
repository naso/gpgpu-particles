import THREE from 'three'
class FBO {
  constructor () {
    this.scene = null
    this.orthoCamera = null
    this.rtt = null
    this.renderer = null
    this.particles = null
  }

  init (width, height, renderer, simulationMaterial, renderMaterial) {
    let gl = renderer.getContext()

    // 1. check support of FLOAT textures (to store positions)
    if (!gl.getExtension('OES_texture_float')) {
      throw new Error('float textures not supported')
    }

    // 2. check support of textures access from within a vertex shader
    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) === 0) {
      throw new Error('vertex shader cannot read textures')
    }

    // 3. Render To Texture setup
    this.scene = new THREE.Scene()
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // 4. create a target texture
    const options = {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      stencilBuffer: false
    }
    this.rtt = new THREE.WebGLRenderTarget(width, height, options)

    // 5. the simulation
    // create a bi-unit quadrilateral and uses the simulation material to update the Float Texture
    const geom = new THREE.BufferGeometry()
    geom.addAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), 3))
    geom.addAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]), 2))
    this.scene.add(new THREE.Mesh(geom, simulationMaterial))

    // 6. the particles
    // create a vertex buffer of size width * height with normalized coordinates
    const l = (width * height)
    const vertices = new Float32Array(l * 3)
    for (let i = 0; i < l; i++) {
      const i3 = i * 3
      vertices[i3] = (i % width) / width
      vertices[i3 + 1] = (i / width) / height
    }
    // create the particles geometry
    const pGeom = new THREE.BufferGeometry()
    pGeom.addAttribute('position', new THREE.BufferAttribute(vertices, 3))

    // the rendermaterial is used to render the particles
    this.particles = new THREE.Points(pGeom, renderMaterial)
    this.renderer = renderer
  }

  update () {
    // 1. update the simulation and render the result in a target texture
    this.renderer.render(this.scene, this.orthoCamera, this.rtt, true)

    // 2. use the result of the swap as the new position for the particles renderer
    this.particles.material.uniforms.positions.value = this.rtt.texture
  }

}

export default FBO
