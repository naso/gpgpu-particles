var gulp = require('gulp')
var rev = require('gulp-rev')
var config = require('../config')

gulp.task('rev.css', function () {
  return gulp.src(
    [
      config.paths.dest + '/**/*.{css,js}',
      '!' + config.paths.dest + '/prototypes',
      '!' + config.paths.dest + '/prototypes/**/*'
    ]
  )
    .pipe(rev())
    .pipe(gulp.dest(config.paths.dest + '/'))
    .pipe(rev.manifest(config.paths.dest + '/rev-manifest.json', {
      merge: true
    }))
    .pipe(gulp.dest(''))
})
