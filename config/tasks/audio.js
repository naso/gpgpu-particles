var gulp = require('gulp')
var changed = require('gulp-changed')
var browserSync = require('browser-sync')
var config = require('../config')

gulp.task('audio', function () {
  return gulp.src(config.audio.src)
    .pipe(changed(config.audio.dest))
    .pipe(gulp.dest(config.audio.dest))
    .pipe(browserSync.reload({stream: true}))
})
