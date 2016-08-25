'use strict'

var gutil = require('gulp-util')
var handleError = require('./error')

// Prettify times
const prettifyTime = function (milliseconds) {
  if (milliseconds > 999) {
    return (milliseconds / 1000).toFixed(2) + ' s'
  } else {
    return milliseconds + ' ms'
  }
}

// Log
const log = function (err, stats) {
  if (err) throw new gutil.PluginError('webpack', err)

  var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow'

  if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach(function (error) {
      handleError(error)
      statColor = 'red'
    })
  } else {
    var compileTime = prettifyTime(stats.endTime - stats.startTime)
    gutil.log(gutil.colors[statColor](stats))
    gutil.log('Compiled with', gutil.colors.cyan('webpack.dev'), 'in', gutil.colors.magenta(compileTime))
  }
}

module.exports = log
