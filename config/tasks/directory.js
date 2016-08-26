var gulp = require('gulp')
var changed = require('gulp-changed')
var browserSync = require('browser-sync')
var config = require('../utils/require').nocache('../config')

gulp.task('directory', function () {
  return gulp.src(config.directory.src)
    .pipe(changed(config.directory.dest))
    .pipe(gulp.dest(config.directory.dest))
    .pipe(browserSync.reload({stream: true}))
})
