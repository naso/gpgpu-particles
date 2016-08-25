var gulp = require('gulp')
var sequence = require('run-sequence')
var watch = require('gulp-watch')
var config = require('../config')

gulp.task('watch', function () {
  watch(config.html.watch, function () {
    gulp.start('html')
  })

  watch(config.sass.watch, function () {
    gulp.start('sass')
  })

  watch(config.svg.watch, function () {
    sequence('svg', 'sass')
  })

  watch(config.fonts.src, function () {
    gulp.start('fonts')
  })

  watch(config.images.watch, function () {
    gulp.start('images')
  })

  watch(config.paths.src + 'scripts/**/*', function () {
    gulp.start('bump.build')
  })

  watch(config.data.watch, function () {
    gulp.start('data')
  })
})
