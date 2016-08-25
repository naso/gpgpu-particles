var gulp = require('gulp')
var changed = require('gulp-changed')
var browserSync = require('browser-sync')
var config = require('../utils/require').nocache('../config')

gulp.task('html', function () {
  return gulp.src(config.html.src)
    .pipe(changed(config.html.dest))
    .pipe(gulp.dest(config.html.dest))
    .pipe(browserSync.reload({stream: true}))
})
