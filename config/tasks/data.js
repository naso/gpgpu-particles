var gulp = require('gulp')
var prettyData = require('gulp-pretty-data')
var browserSync = require('browser-sync')
var config = require('../config')

gulp.task('data', function () {
  gulp.src(config.data.src)
    .pipe(prettyData({type: 'minify', preserveComments: false}))
    .pipe(gulp.dest(config.data.dest))
    .pipe(browserSync.reload({stream: true}))
})
