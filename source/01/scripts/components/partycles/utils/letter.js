class Letter {

  constructor () {
    this.element = document.createElement('canvas')
    this.element.width = 256
    this.element.height = 256
    this.element.id = 'letter'

    this.ctx = this.element.getContext('2d')
  }

  getLetter (letter) {
    this.ctx.font = '100px Georgia'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(letter, this.element.width / 2, this.element.height / 2)
  }
}

export default Letter
