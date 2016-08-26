import template from './info.html'

class InfoPanel {
  constructor () {
    this.element = document.createElement('div')
    this.element.innerHTML = template()
    this.element = this.element.firstChild

    this.toggle = this.toggle.bind(this)
    this.element.querySelector('.button').addEventListener('click', this.toggle)
  }

  toggle () {
    this.element.classList.toggle('collapsed')
  }
}

export default InfoPanel
