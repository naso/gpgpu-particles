/* globals WebFont */

class FontLoader {
  constructor () {
    this.isLoaded = false
  }

  async load (fonts) {
    try {
      return new Promise((resolve, reject) => {
        WebFont.load({
          classes: false,
          custom: {
            families: fonts
          },
          active: () => {
            this.isLoaded = true
            resolve()
          },
          fontinactive: (fontName) => {
            reject(Error(`FontLoader: Could not load the font ${fontName}.`))
          }
        })
      }).then(this.manifestLoaded.bind(this))
    } catch (error) {
      console.error(error)
    }
  }

  manifestLoaded () {
    // Logger.log('FontLoader', 'Fonts files loaded.')
  }
}

export default new FontLoader()
