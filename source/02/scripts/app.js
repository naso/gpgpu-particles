import Canvas from './components/canvas'
import Letter from './components/letter'
import _ from 'lodash'

class App {
  constructor () {
    window.app = this

    this.element = document.createElement('div')
    this.element.id = 'app'
    document.body.appendChild(this.element)

    this.dims = {w: window.innerWidth, h: window.innerHeight}
  }

  start () {
    const BUFFER_DIMENSIONS = 512

    // source canvas holding the letter
    this.letter = new Letter(BUFFER_DIMENSIONS)
    this.element.appendChild(this.letter.element)

    // output canvas (WebGL)
    this.canvas = new Canvas(BUFFER_DIMENSIONS, this.letter)
    this.element.appendChild(this.canvas.element)

    // events listeners
    this.bindEvents()

    // force an initial resize
    this.resize()
  }

  bindEvents () {
    this.resize = _.debounce(this.resize.bind(this), 300)
    this.onKeyPress = this.onKeyPress.bind(this)

    window.addEventListener('resize', this.resize)
    window.addEventListener('keypress', this.onKeyPress)
  }

  unbindEvents () {
    window.removeEventListener('resize', this.resize)
    window.addEventListener('keypress', this.onKeyPress)
  }

  onKeyPress (e) {
    this.letter.update(e.key)
  }

  resize () {
    this.dims.w = window.innerWidth
    this.dims.h = window.innerHeight

    this.canvas.resize()
  }

  dispose () {
    this.unbindEvents()
  }
}

export default App
