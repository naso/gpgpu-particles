var gulp = require('gulp')
var webpack = require('webpack')
var log = require('../utils/log')
var config = require('../webpack.config')
var browserSync = require('browser-sync')

gulp.task('webpack', function (callback) {
  config = config(process.env.NODE_ENV)

  if (process.env.NODE_ENV === 'development') {
    var built = false
    webpack(config).watch(200, function (err, stats) {
      log(err, stats)
      browserSync.reload()
      if (!built) {
        built = true
        callback()
      }
    })
  } else {
    webpack(config, function (err, stats) {
      log(err, stats)
      callback()
    })
  }
})
