'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    paths = {};

paths.sources = ['./app/**/*.js', './test/**/*.js', 'gulpfile.js', 'index.js', 'clustered_app.js'];
paths.specs = ['./test/**/*.js'];

gulp.task('lint', function () {
    gulp.src(paths.sources)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
    gulp.src(paths.specs)
        .pipe(jasmine());
});

gulp.task('default', ['lint', 'test']);
