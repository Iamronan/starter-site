'use strict';

const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browser     = require('browser-sync');
const del         = require('del');
const gutil       = require('gulp-util');

var hub = new HubRegistry(['gulp_tasks/*.js']);
gulp.registry(hub);


// Dev URL for browser-sync
var dev_url = "devurl.dev";

// Clean build folder
gulp.task('clean', function(cb) {
  gutil.log('Clean: ' + gutil.colors.blue('Build folder has been cleaned!'));
  return del(['build/**/*'], cb);
});

gulp.task('serve', function() {
  browser.init({
      // files: ["./build/css/app.css", "./build/js/*.js"],
      logSnippet: false,
      notify: false,
      proxy: dev_url,
  });
});

gulp.task('build',
  gulp.series('clean', gulp.parallel('css', 'scripts', 'js-lint', 'svg', 'images', 'fonts')), () => {
});

gulp.task('watch', () => {
  gulp.watch('assets/scss/**/*', gulp.series('css'));
  gulp.watch('assets/js/app.js', gulp.series('js', 'js-lint'));
  gulp.watch('assets/svg/*', gulp.series('svg'));
  gulp.watch('assets/images/*', gulp.series('images'));
  gulp.watch('assets/fonts/*', gulp.series('fonts'));
});


gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')), () => {});
