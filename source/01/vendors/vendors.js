import './libs/webfont.js'
import 'preload-js'

if (process.env.NODE_ENV === 'production') {
  window.console = {
    log: function () {},
    info: function () {},
    debug: function () {},
    warn: function () {}
  }
}
