import Version from './components/version/version'
import FontLoader from './controllers/font-loader'
import Compatibility from './utils/compatibility'


class Zero {
  constructor () {}

  async init (config) {
    this.config = config

    let domLoaded = this.domLoaded.bind(this)
    return new Promise((resolve, reject) => {
      document.addEventListener('DOMContentLoaded', function () {
        domLoaded(resolve)
      })
    })
  }

  domLoaded (resolve) {
    document.removeEventListener('DOMContentLoaded', this.domLoaded)

    let isReady = this.ready.bind(this)
    FontLoader.load(['Space Mono']).then(function () {
      isReady(resolve)
    })
    return
  }

  ready (resolve) {
    let output = {}
    output.isCompatible = Compatibility.isCompatible()

    // Add build version output
    if (this.config.build) {
      document.body.appendChild(Version.element)
      setTimeout(Version.toggle, 1000)
    }

    resolve(output)
  }

}

export default new Zero()
