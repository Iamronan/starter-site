'use strict';

const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const cheerio = require('gulp-cheerio');
const inject = require('gulp-inject');

gulp.task('svg', function () {
    var svgs = gulp
        .src('./assets/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    inlineSvg: true,
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(cheerio(function ($) {
            $('svg').attr('style',  'display:none');
        }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('./index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('./'));
});
