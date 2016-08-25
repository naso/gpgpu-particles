/* globals createjs */

const Compatibility = require('../../utils/compatibility')
const Emitter = require('tiny-emitter')

class AssetLoader extends Emitter {

  static ASSET_LOADED = 'assetLoaded'
  static ASSET_ERROR = 'assetError'
  static PROGRESS = 'progress'
  static COMPLETE = 'complete'

  constructor () {
    super()
    this.queue = new createjs.LoadQueue()
    this.queue.on('fileload', this.onFileLoaded.bind(this))
    this.queue.on('progress', this.onOverallProgress.bind(this))
    this.queue.on('error', this.onFileError.bind(this))
  }

  loadManifest (manifest) {
    if (manifest.list.length === 0) {
      console.error(`The manifest "${manifest.id}" has an empty assets list.`)
      return
    }
    while (manifest.list.length > 0) {
      const item = manifest.list.shift()

      let asset = {id: item.id}
      let platform
      let pixelRatio

      if (Compatibility.is(Compatibility.MOBILE())) {
        platform = 'mobile'
      } else if (Compatibility.is(Compatibility.TABLET())) {
        platform = 'tablet'
      } else {
        platform = 'desktop'
      }

      if (Compatibility.getPixelRatio() === 2) {
        pixelRatio = '2x'
      } else {
        pixelRatio = '1x'
      }

      if (item.asset[platform]) {
        if (item.asset[platform][pixelRatio]) {
          asset.src = item.asset[platform][pixelRatio]
        } else {
          pixelRatio = '1x'
          if (item.asset[platform][pixelRatio]) {
            asset.src = item.asset[platform][pixelRatio]
          } else {
            pixelRatio = 'n/a'
            asset.src = item.asset[platform]
          }
        }
      } else {
        platform = 'desktop'
        if (item.asset[platform]) {
          if (item.asset[platform][pixelRatio]) {
            asset.src = item.asset[platform][pixelRatio]
          } else {
            pixelRatio = '1x'
            if (item.asset[platform][pixelRatio]) {
              asset.src = item.asset[platform][pixelRatio]
            } else {
              pixelRatio = 'n/a'
              asset.src = item.asset[platform]
            }
          }
        } else {
          platform = 'n/a'
          if (item.asset[pixelRatio]) {
            asset.src = item.asset[pixelRatio]
          } else {
            pixelRatio = '1x'
            if (item.asset[pixelRatio]) {
              asset.src = item.asset[pixelRatio]
            } else {
              pixelRatio = 'n/a'
              asset.src = item.asset
            }
          }
        }
      }

      if (asset.src !== '') {
        this.queue.loadFile(asset)
      }
    }
  }

  onOverallProgress (e) {
    this.emit(AssetLoader.PROGRESS, e)
  }

  onFileLoaded (e) {
    this.emit(AssetLoader.ASSET_LOADED, e)
  }

  onFileError (e) {
    this.emit(AssetLoader.ASSET_ERROR, e)
  }

}

module.exports = AssetLoader
