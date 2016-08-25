import pkg from '../../../../../../package.json'

/*
 * - Build version info -
 * It updates at every first build or script change.
 * Helps keep tracking at which version certain feature/bug
 * was implemented/fixed.
 *
 */

class Version {
  constructor () {
    this.element = document.createElement('div')
    this.element.className = 'version'

    this.container = document.createElement('div')
    this.container.className = 'container'
    this.element.appendChild(this.container)

    this.collapse = document.createElement('div')
    this.collapse.className = 'button'
    this.container.appendChild(this.collapse)

    this.content = document.createElement('div')
    this.content.className = 'content'
    this.content.innerHTML = `
    <span>VERSION</span> ${pkg.version}
    <span>BUILD</span> ${pkg.build} ${pkg.build_date}
    `
    this.container.appendChild(this.content)

    this.toggle = this.toggle.bind(this)
    this.collapse.addEventListener('click', this.toggle)
  }

  toggle () {
    this.element.classList.toggle('collapsed')
  }
}

export default new Version()
