var gulp = require('gulp')
var revReplace = require('gulp-rev-replace')
var config = require('../config')

gulp.task('rev.html', function (cb) {
  var manifest = gulp.src(config.paths.dest + '/rev-manifest.json')

  return gulp.src([
    config.paths.dest + '/*.+(html|php)',
    '!' + config.paths.dest + '/prototypes',
    '!' + config.paths.dest + '/prototypes/**/*'])
    .pipe(revReplace({
      manifest: manifest,
      replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php']
    }))
    .pipe(gulp.dest(config.paths.dest))
})
