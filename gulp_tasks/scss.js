'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const lost = require('lost');
const browser = require('browser-sync');

var sassPaths = [
  // For using with foundation / bootstrap etc
  // Point this towards any folder that contains scss files and they will be
  // included...
];

gulp.task('css', () => {
  var processors = [
      autoprefixer({browsers: ['last 3 versions']}),
      cssnano(),
      lost(),
  ];
  return gulp.src('./assets/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(
      // includePaths: sassPaths,
    ).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/css'))
    .pipe(browser.stream());
});
