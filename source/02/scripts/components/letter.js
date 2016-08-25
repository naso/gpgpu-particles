import Emitter from 'tiny-emitter'

class Letter extends Emitter {

  constructor (bufferDimension) {
    super()

    this.font = '100px Georgia'
    this.color = 'white'

    this.element = document.createElement('canvas')
    this.element.width = bufferDimension
    this.element.height = bufferDimension
    this.element.id = 'letter'

    this.ctx = this.element.getContext('2d')
  }

  update (letter) {
    if (letter !== ' ' && letter !== '') {
      this.letter = letter
      this.draw()
      this.emit('update')
    }
  }

  draw () {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    this.ctx.font = this.font
    this.ctx.fillStyle = this.color
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(this.letter, this.element.width / 2, this.element.height / 2)
  }
}

export default Letter
