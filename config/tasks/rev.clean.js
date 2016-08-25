var gulp = require('gulp')
var fs = require('fs')
var config = require('../config')

gulp.task('rev.clean', function () {
  var url = config.paths.dest + '/rev-manifest.json'
  var manifest = require(url)

  for (var key in manifest) {
    var file = config.paths.dest + '/' + key
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }
})
