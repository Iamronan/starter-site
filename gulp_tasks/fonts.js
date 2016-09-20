'use strict';

var gulp     = require('gulp');
var flatten  = require('gulp-flatten');

gulp.task('fonts', function() {
  return gulp.src('./assets/fonts/*.{ttf,woff,eof,svg}')
    .pipe(flatten())
    .pipe(gulp.dest('./build/fonts'))
});
