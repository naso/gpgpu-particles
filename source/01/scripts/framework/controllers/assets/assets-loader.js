const _ = require('lodash')
const Emitter = require('tiny-emitter')
const AssetsModel = require('../../models/assets-model')
const AssetLoader = require('./asset-loader')

class AssetsLoader extends Emitter {

  constructor () {
    super()
  }

  init () {
    this.ASSET_LOADED = AssetLoader.ASSET_LOADED
    this.ASSET_ERROR = AssetLoader.ASSET_ERROR
    this.PROGRESS = AssetLoader.PROGRESS
    this.COMPLETE = AssetLoader.COMPLETE

    this.batches = []
    this.loadedAssets = []
    this.loadedBatches = []
    this.batchesToLoad = []
    this.model = new AssetsModel()

    this.assetLoader = new AssetLoader()
    this.assetLoader.on(AssetLoader.PROGRESS, this.onOverallProgress.bind(this))
    this.assetLoader.on(AssetLoader.ASSET_LOADED, this.onFileLoaded.bind(this))
    this.assetLoader.on(AssetLoader.ASSET_ERROR, this.onFileError.bind(this))
  }

  async fetchManifest (manifest) {
    this.init()
    this.ASSETS_MANIFEST_URL = manifest
    try {
      await this.model.fetch(this.ASSETS_MANIFEST_URL).then(this.manifestLoaded.bind(this))
    } catch (error) {
      console.error(error)
    }
  }

  manifestLoaded () {}

  loadBatch (batches) {
    this.batches = batches
    this.batchesToLoad = []

    _.forEach(this.batches, (batch) => {
      const batchData = _.find(this.model.data, (o) => o.id === batch)
      if (batchData === undefined) {
        console.error(`Batch "${batch}" was not found on the assets list.`)
      } else if (this.loadedBatches.indexOf(batch) === -1) {
        this.batchesToLoad.push(batch)
        this.assetLoader.loadManifest(batchData)
      }
    })

    if (this.batchesToLoad.length === 0) {
      this.emit(AssetLoader.COMPLETE)
    }
  }

  onOverallProgress (e) {
    this.emit(AssetLoader.PROGRESS, e)
  }

  onFileLoaded (e) {
    if (e.currentTarget._numItems === e.currentTarget._numItemsLoaded) {
      const loadedAssets = e.currentTarget._loadItemsById
      let key
      for (key in loadedAssets) {
        loadedAssets[key].result = e.currentTarget._loadedResults[key]
        this.loadedBatches = this.loadedBatches.concat(this.batchesToLoad)
      }
      this.loadedAssets = this.loadedAssets.concat(loadedAssets)
      this.emit(AssetLoader.COMPLETE, loadedAssets)
    }
  }

  onFileError (e) {
    this.emit(AssetLoader.ASSET_ERROR, e)
  }
}

module.exports = new AssetsLoader()
