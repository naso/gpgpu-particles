var gulp = require('gulp')
var bump = require('gulp-bump')
var jeditor = require('gulp-json-editor')
var moment = require('moment-timezone')
var argv = require('yargs').argv
var pkg
var build

gulp.task('bump', function () {
  var type = 'patch'

  if (argv.major) {
    type = 'major'
  } else if (argv.minor) {
    type = 'minor'
  } else if (argv.patch) {
    type = 'patch'
  } else if (argv.build) {
    type = 'build'
  }

  if (type === 'build') {
    return gulp.start('bump.build')
  } else {
    return gulp.src('./package.json')
      .pipe(bump({
        type: type
      }))
      .pipe(gulp.dest('./'))
  }
})

gulp.task('bump.build', function () {
  pkg = require('../utils/require').nocache('../../package.json')
  build = process.env.NODE_ENV === 'production' ? 0 : (Number(pkg.build) + 1)

  return gulp.src('./package.json')
    .pipe(jeditor({
      'build': build.toString(),
      'build_date': moment().tz('WET').format('llll z')
    }))
    .pipe(gulp.dest('./'))
})
