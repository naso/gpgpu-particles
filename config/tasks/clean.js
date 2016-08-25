var gulp = require('gulp')
var del = require('del')
var config = require('../config')

gulp.task('clean', function (cb) {
  return del([
    config.html.dest,
    config.html.dest + '/**/*',
    '!' + config.html.dest + '/prototypes',
    '!' + config.html.dest + '/prototypes/**/*'
  ], {force: true}, cb)
})
