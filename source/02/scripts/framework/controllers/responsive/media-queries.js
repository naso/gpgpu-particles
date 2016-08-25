// ---------------------
// Media Queries Manager
// ---------------------
//
// @author  : Fábio Azevedo < me@icantcontrolmyego.net >
// @date    : September 2014
//
// Instructions are at src/scss/framework/responsive/_controller.scss.

class MediaQueries {

  constructor () {
    this.SMALL = 'small'
    this.MEDIUM = 'medium'
    this.LARGE = 'large'

    this.SMALL_BREAKPOINT = {name: 'Small', breakpoints: [ this.SMALL ]}
    this.MEDIUM_BREAKPOINT = {name: 'Medium', breakpoints: [ this.MEDIUM, this.SMALL ]}
    this.LARGE_BREAKPOINT = {name: 'Large', breakpoints: [ this.LARGE ]}

    this.BREAKPOINTS = [
      this.SMALL_BREAKPOINT,
      this.MEDIUM_BREAKPOINT,
      this.LARGE_BREAKPOINT
    ]
  }

  getDeviceState () {
    return window.getComputedStyle(document.body, 'after').getPropertyValue('content').split('"').join('')
  }

  getBreakpoint () {
    const state = this.getDeviceState()

    let i
    for (i = 0; i < this.BREAKPOINTS.length; i++) {
      if (this.BREAKPOINTS[i].breakpoints.indexOf(state) > -1) {
        return String(this.BREAKPOINTS[i].name)
      }
    }

    return ''
  }

  isBreakpoint (breakpoint) {
    let i
    for (i = 0; i < breakpoint.breakpoints.length; i++) {
      if (breakpoint.breakpoints[i] === this.getDeviceState()) {
        return true
      }
    }
    return false
  }
}

export default new MediaQueries()
