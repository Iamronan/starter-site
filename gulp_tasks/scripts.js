'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
var babel = require("gulp-babel");
const jscs = require('gulp-jscs');

var onError = function (err) {
  console.log('Plumber Error: ' + err);
};

gulp.task('scripts', function() {
  return browserify('./assets/js/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

// TODO: Better JS Linter needed!

gulp.task('js-lint', () => {
  return gulp.src('./assets/js/app.js')
    .pipe(jscs())
    .pipe(jscs.reporter())
    // .pipe(jscs.reporter('fail'))
});
