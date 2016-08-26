var gulp = require('gulp')
var browserSync = require('browser-sync')
var fs = require('fs')
var config = require('../config')
var custom_browsersync

gulp.task('serve', function () {
  fs.exists('./config/tasks/custom.browsersync.js', function (exists) {
    var data = config.browserSync
    if (exists) {
      custom_browsersync = require('../custom.browsersync')
      data = custom_browsersync.browserSync
    }

    browserSync.init(data)
  })
})
