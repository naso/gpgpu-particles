var gulp = require('gulp')
var svgmin = require('gulp-svgmin')
// var svgspritesheet = require('gulp-svg-spritesheet')
var browserSync = require('browser-sync')
var config = require('../config')

/*
 * Attemp: create a spritesheet of svg assets
 * Drawback: SVG are included via background-image and you can't style it
 * using fill, stroke, stroke-width
 *
 * So decided to just move the assets, but minify the content
 * and include it via <object> tag which at least let you set the width and
 * height of the element.
 *
 */

gulp.task('svg', ['svg-generate'], function (callback) {
  browserSync.reload()
  callback()
})

gulp.task('svg-generate', function () {
  return gulp.src(config.svg.src)
    // .pipe(svgspritesheet({
    //   cssPathSvg: '../assets/images/spritesheet/svg/sprite.svg',
    //   templateSrc: config.svg.template,
    //   templateDest: config.svg.scss
    // }))
    .pipe(svgmin())
    .pipe(gulp.dest(config.svg.dest))
})
