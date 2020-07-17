'use strict';

var gulp = require('gulp');
var server = require('browser-sync').create();

gulp.task('server', function () {
  server.init({
    server: '/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('server'));
