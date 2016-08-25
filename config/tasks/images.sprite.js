var gulp = require('gulp')
var fs = require('fs')
var path = require('path')
var spritesmith = require('gulp.spritesmith')
var merge = require('merge-stream')
var imagemin = require('gulp-imagemin')
var buffer = require('vinyl-buffer')
var url = require('url')
var config = require('../config')
var error = require('../utils/error')

gulp.task('images.sprite', function () {
  function getFolders (dir) {
    return fs.readdirSync(dir)
      .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory()
      })
  }

  var folders = getFolders(config.images.spritesheet)

  var tasks = folders.map(function (folder) {
    var spritePath = config.images.spritesheet + '/' + folder

    var settings = {}
    settings.retinaSrcFilter = [spritePath + '/*-2x.{png,jpg}']
    settings.imgName = 'sprite.png'
    settings.retinaImgName = 'sprite-2x.png'
    settings.imgPath = path.relative(config.sass.dest, config.images.dest + '/spritesheet/' + folder) + '/' + settings.imgName
    settings.imgPath = url.resolve(settings.imgPath, '')
    settings.retinaImgPath = path.relative(config.sass.dest, config.images.dest + '/spritesheet/' + folder) + '/' + settings.retinaImgName
    settings.retinaImgPath = url.resolve(settings.retinaImgPath, '')
    settings.cssName = '_sprite.scss'
    settings.padding = 1

    var spriteData = gulp.src(spritePath + '/*.{png,jpg}')
      .pipe(spritesmith(settings))

    var imgStream = spriteData.img
      .pipe(buffer()).pipe(imagemin())
      .pipe(imagemin())
      .on('error', error)
      .pipe(gulp.dest(config.images.dest + '/spritesheet/' + folder))

    var cssStream = spriteData.css
      .pipe(gulp.dest(config.sass.settings.sass + '/framework/spritesheet/' + folder))

    return merge(imgStream, cssStream)
  })

  return tasks
})
