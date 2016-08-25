const path = require('path')
const argv = require('yargs').argv

var config = {}

if (argv.i !== undefined) {
  config.iteration = argv.i < 10 ? '0' + argv.i : argv.i
  config.iteration += '/'
} else {
  config.iteration = ''
}

/**
 * Paths
 */

config.paths = {}
config.paths.root = path.join(__dirname, '..') + '/'
config.paths.src = config.paths.root + 'source/' + config.iteration
config.paths.dest = config.paths.root + 'website/' + config.iteration

/**
 * Webpack
 */

config.webpack = {}
config.webpack.entry = {}
config.webpack.entry.app = config.paths.src + 'scripts/index.js'
config.webpack.entry.vendor = config.paths.src + 'vendors/vendors.js'

config.webpack.js = {}
config.webpack.js.include = config.paths.src + 'scripts/'

/**
 * Fonts
 */

config.fonts = {}
config.fonts.src = config.paths.src + 'assets/fonts/**/*'
config.fonts.dest = config.paths.dest + 'assets/fonts/'

/**
 * Audio
 */

config.audio = {}
config.audio.src = config.paths.src + 'assets/audio/**/*'
config.audio.dest = config.paths.dest + 'assets/audio/**/*'

/**
 * Images
 */

config.images = {}
config.images.src = [
  config.paths.src + 'assets/images/**/*',
  '!' + config.paths.src + 'assets/images/spritesheet/',
  '!' + config.paths.src + 'assets/images/spritesheet/**/*'
]
config.images.dest = config.paths.dest + 'assets/images/'
config.images.spritesheet = config.paths.src + 'assets/images/spritesheet/'
config.images.watch = [
  config.paths.src + 'assets/images/**/*',
  '!' + config.paths.src + 'assets/images/spritesheet/svg/',
  '!' + config.paths.src + 'assets/images/spritesheet/svg/**/*'
]

/**
 * SVG
 */

config.svg = {}
config.svg.src = config.paths.src + 'assets/images/spritesheet/svg/*.svg'
config.svg.template = config.paths.src + 'styles/framework/spritesheet/svg/_template.scss'
config.svg.scss = config.paths.src + 'styles/framework/spritesheet/svg/_sprite.scss'
config.svg.dest = config.paths.dest + 'assets/images/spritesheet/svg/'
config.svg.watch = [
  config.svg.template,
  config.svg.src
]

/**
 * SASS
 */

config.sass = {}
config.sass.src = config.paths.src + 'styles/index.scss'
config.sass.dest = config.paths.dest + 'styles/'
config.sass.watch = [
  config.paths.src + 'styles/**/*',
  '!' + config.paths.src + 'styles/framework/spritesheet/svg/',
  '!' + config.paths.src + 'styles/framework/spritesheet/svg/**/*'
]
config.sass.settings = {
  sass: config.paths.src + 'styles/',
  css: config.sass.dest,
  image: config.images.dest
}
config.sass.autoprefixer = {
  browsers: ['last 2 version']
}

/**
 * HTML
 */

config.html = {}
config.html.src = [
  config.paths.src + 'website/**/*',
  config.paths.src + 'website/**/.*'
]
config.html.dest = config.paths.dest
config.html.watch = [
  config.paths.src + 'website/**/*'
]

/**
 * Data
 */

config.data = {}
config.data.src = config.paths.src + 'assets/data/**/*.{xml,json}'
config.data.dest = config.paths.dest + 'assets/data/'
config.data.watch = config.paths.src + 'assets/data/**/*'

/**
 * BrowserSync
 */

config.browserSync = {}
config.browserSync.server = {
  baseDir: config.paths.dest
}
config.browserSync.port = 3000

module.exports = config
