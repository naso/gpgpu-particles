var gulp = require('gulp')
var changed = require('gulp-changed')
var imagemin = require('gulp-imagemin')
var browserSync = require('browser-sync')
var config = require('../config')

gulp.task('images', ['images.sprite', 'svg'], function () {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.reload({stream: true}))
})
