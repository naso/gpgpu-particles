import Zero from './framework/'
import Assets from './framework/controllers/assets/assets-loader'
import App from './app'

Zero.init({build: true}).then(ready)

let app

function ready (app) {
  /*
   * Compatibility handler
   *
   * If app doesn't meet any of the requirements set as
   * Compatibility.REQUIRED() it will return that flag as false.
   */

  if (!app.isCompatible) {
    document.body.classList.add('not-supported')
    return
  } else {
    document.body.classList.add('supported')
  }

  /*
   * Assets loader
   *
   * Preloading the initial batch of assets that we might need
   * to show the first screen of the app.
   */

  Assets.fetchManifest(window.location.pathname + 'assets/data/assets-list.json').then(onManifestLoaded)
}

function onManifestLoaded () {
  addPreloader()

  Assets.on(Assets.PROGRESS, onProgress)
  Assets.on(Assets.COMPLETE, onComplete)
  // Assets.loadBatch(['preloader'])
  onComplete()
}

function addPreloader () {}

function onProgress (e) {}

function onComplete (e) {
  Assets.off(Assets.PROGRESS)
  Assets.off(Assets.COMPLETE)
  initApp()
}

function initApp () {
  app = new App()
  app.start()
}
