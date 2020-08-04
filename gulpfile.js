// Gulp.js configuration
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function update_html() {
  return gulp.src(['src/*.html']).pipe(gulp.dest('dest')).pipe(browserSync.stream());
}

function serve_browser() {
  browserSync.init({
    server: './dest'
  });

  gulp.watch(['src/*.html']).on('change', update_html);
}

var build = gulp.series(gulp.parallel(update_html, serve_browser));

exports.default = build;