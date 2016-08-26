import InfoPanel from './components/info/info'
import Canvas from './components/particles/canvas'
import Letter from './components/particles/utils/letter'
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
    this.info = new InfoPanel()
    this.element.appendChild(this.info.element)

    this.letter = new Letter()
    this.element.appendChild(this.letter.element)

    this.canvas = new Canvas()
    this.element.appendChild(this.canvas.element)

    this.bindEvents()
    this.resize()
  }

  bindEvents () {
    this.resize = _.debounce(this.resize.bind(this), 300)
    window.addEventListener('resize', this.resize)
  }

  unbindEvents () {
    window.removeEventListener('resize', this.resize)
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
