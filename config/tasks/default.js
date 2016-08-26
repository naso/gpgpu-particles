const gulp = require('gulp')
const sequence = require('run-sequence')

gulp.task('dev', function (cb) {
  process.env.NODE_ENV = 'development'
  sequence('clean', 'webpack', 'fonts', 'audio', 'images', 'sass', 'html', 'directory', 'data', 'watch', 'serve', cb)
})

gulp.task('build', function (cb) {
  process.env.NODE_ENV = 'production'
  sequence('bump', 'bump.build', 'clean', 'webpack', ['fonts', 'audio', 'images'], 'sass', 'html', 'directory', 'data', 'rev.css', 'rev.html', 'rev.clean', 'strip.logs', cb)
})
