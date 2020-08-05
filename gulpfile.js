// Gulp.js configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

function update_html() {
  return gulp
    .src(['src/*.html'])
    .pipe(gulp.dest('dest'))
    .pipe(browserSync.stream());
}

function update_scripts() {
  return gulp
    .src(['src/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dest/js'))
    .pipe(browserSync.stream());
}

function update_styles() {
  return gulp
    .src(['src/scss/*.scss'])
    .pipe(sass())
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(cleanCSS())
    .pipe(gulp.dest('dest/css'))
    .pipe(browserSync.stream());
}

function copy_files() {
  return gulp
    .src(['src/images/**', 'src/json/images.json'], {
      base: 'src/'
    })
    .pipe(gulp.dest('dest'));
}

function serve_browser() {
  browserSync.init({
    server: './dest'
  });

  gulp.watch(['src/*.html']).on('change', update_html);
  gulp.watch(['src/js/*.js']).on('change', update_scripts);
  gulp.watch(['src/scss/*.scss']).on('change', update_styles);
}

var build = gulp.series(
  gulp.parallel(
    copy_files,
    update_scripts,
    update_styles,
    update_html,
    serve_browser
  )
);

exports.default = build;