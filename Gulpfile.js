//'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('compass-options').paths();
var browserSync = require('browser-sync');
var shell = require('gulp-shell');
var styledocco = require('gulp-styledocco');

/******* Linting  Task**********/

gulp.task('lint', function () {
  return gulp.src([
      paths.js + '/**/*.js',
      '!' + paths.js + '/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});



/******* Styledocco - Styleguide **********/

gulp.task('styledocco', function () {
  return gulp.src(paths.sass+'/**/*.scss')
  .pipe(styledocco({
    out: 'styleguide',
    name: 'Project-Name'
  }));
});



/******* Compass Js **********/

gulp.task('compass', function () {
  return gulp.src(paths.sass + '/**/*')
    .pipe(shell([
      'bundle exec compass watch --time'
    ]));
});




/******* Watch **********/

gulp.task('watch', function () {
  gulp.watch(paths.js + '/**/*.js', ['lint']);
});




/******* BrowserSync Task  **********/

gulp.task('browserSync', function () {
  browserSync.init([
    paths.css +  '/**/*.css',
    paths.js + '/**/*.js',
    paths.img + '/**/*',
    paths.fonts + '/**/*',
    paths.html + '/**/*.html',
  ]);
});




/******* Server Tasks **********/

gulp.task('styleguide', [ 'compass', 'styledocco']);
gulp.task('server', ['watch', 'compass', 'browserSync']);
gulp.task('serve', ['server']);
