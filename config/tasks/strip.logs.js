var gulp = require('gulp')
var config = require('../config')
var stripDebug = require('gulp-strip-debug')

gulp.task('strip.logs', function () {
  return gulp.src(config.paths.dest + '/scripts/**/*.js')
    .pipe(stripDebug())
    .pipe(gulp.dest(config.paths.dest + '/scripts'))
})
