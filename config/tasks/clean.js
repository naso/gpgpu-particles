var gulp = require('gulp')
var del = require('del')
var config = require('../config')

gulp.task('clean', function (cb) {
  return del([
    config.paths.dest,
    config.root.dest + 'assets',
    config.root.dest + '*.*'
  ], {force: true}, cb)
})
