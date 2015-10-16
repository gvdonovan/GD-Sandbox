var path = require('path');


var appRoot = './www/';

module.exports = function() {
  return {
    bower: {
      directory: './bower_components/',
      bowerJson: require('../bower.json' ),
      ignorePath: '../..'
    },
    client: appRoot,
    vendor: appRoot + 'vendor/',
    vendorjs: appRoot + 'vendor/js/',
    appcss: appRoot + 'css/',
    source: appRoot + 'app/**/*.js',
    html:   appRoot + 'app/**/*.html',
    style:  appRoot + 'css/**/*.css',
    sassStyle: appRoot + 'css/**/*.app.css',
    lib:    appRoot + 'lib/',
    images: './img/*',
    clientImages: appRoot + 'img/',
    sass: ['./scss/**/*.scss'],
    customTheme: './customTheme/',
    karma: './'
  };
};