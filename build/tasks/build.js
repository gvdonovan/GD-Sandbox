var gulp 		= require('gulp');
var wiredep = require('wiredep');
var inject  = require('gulp-inject');
var order   = require('gulp-order');
var sass    = require('gulp-sass');
var plumber = require('gulp-plumber');
var minifyCss = require('gulp-minify-css');
var fs = require('fs');
var del = require('del');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');


var paths   = require('../paths')();

/**
 * Wire Bower dependencies and inject application js
 */
gulp.task('index', function() {
  runSequence('clean:stylesheets', 'sass', 'images', 'vendor-js', 'vendor-css', 'vendor-fonts', 'injectBowerApp');
});

/**
 * Resources
 */
gulp.task('resources', shell.task([
  'ionic resources'
]));

/**
 * Inject Bower
 */
gulp.task('injectBowerApp', function(){
  gulp
    // Source index.html
    .src(paths.client + 'index.html')
    .pipe(plumber())
    // Wire bower components
    .pipe(wiredep.stream({options: paths.bower,
      ignorePath: 'ionic/**/*.css',
      fileTypes: {
        html: {
          replace: {
            js: function(filePath) {
              return '<script src="' + 'vendor/js/' + filePath.split('/').pop() + '"></script>';
            },
            css: function(filePath) {
              return '<link rel="stylesheet" href="' + 'vendor/css/' + filePath.split('/').pop() + '"/>';
            }}}}}))
    // Wire lib/!**.js
    .pipe(inject(gulp.src(paths.lib + '*.js',{read: false}), { name: 'lib', relative: true}))
    // Wire app/!**.js
    .pipe(inject(gulp.src(paths.source)
      .pipe(order(['**/app.js', '**/*.module.js', '**/!*.js']), {read: false, name: 'inject'}), {relative: true}))
    .pipe(inject(gulp.src(paths.style, {read: false, name: 'inject'}), {relative: true}))
    .pipe(gulp.dest(paths.client))
    .pipe(gulp.dest(paths.client))
    .pipe(gulp.dest(paths.client));
});

/**
 * Copy Bower js
 */
gulp.task('vendor-js', function() {
  return gulp
    .src(wiredep(paths.bower).js)
    .pipe(gulp.dest(paths.vendor + 'js/'));
});

/**
 * Copy Bower css
 */
gulp.task('vendor-css', function() {
  return gulp
    .src(wiredep(paths.bower).css)
    .pipe(gulp.dest(paths.vendor + 'css/'));
});

/**
 * Copy Bower fonts
 */
gulp.task('vendor-fonts', function() {

  var fonts = [
    paths.bower.directory + '/ionic/fonts/ionicons.*',
    paths.bower.directory + '/ionicons/fonts/ionicons.*'
  ];

  return gulp
    .src(fonts)
    .pipe(gulp.dest(paths.vendor + 'fonts/fonts/'));
});

/**
 * Inject lib.js
 */
gulp.task('lib-js', function(){
  return gulp
    .src(paths.client + 'index.html')
    .pipe(inject(gulp.src(paths.lib + '*.js', {read: false}),  {relative: true, name: 'lib'}))
    .pipe(gulp.dest(paths.client));
});
gulp.task('images', function(){
  return gulp
    .src(fs.existsSync(paths.customTheme) ? paths.customTheme + '/img/*' : paths.images)
    .pipe(gulp.dest(paths.clientImages));
});

/**
 * Clear old stylesheets
 */
gulp.task('clean:stylesheets', function () {
  return del([paths.sassStyle]);
});

/**
 * Sass
 */
gulp.task('sass', function(done) {
  gulp.src(fs.existsSync(paths.customTheme) ? paths.customTheme + 'scss/*.scss' : paths.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(paths.appcss))
    /*   TODO: Set up build */
    /*
     .pipe(minifyCss({
     keepSpecialComments: 0
     }))
     .pipe(rename({ extname: '.min.css' }))
     .pipe(gulp.dest('./www/css/'))
     */
    .on('end', done);
});
