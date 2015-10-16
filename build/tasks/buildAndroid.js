var gulp = require('gulp');
var shell = require('gulp-shell');

//TODO: build this task out more with necessary additional plugins
gulp.task('buildAndroid', shell.task([
  'ionic platform remove android',
  'ionic platform add android',
  'ionic build android'
]));