// Karma configuration
// Generated on Tue Sep 01 2015 15:43:57 GMT-0500 (COT)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],


    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cache/dist/angular-cache.js',
      'bower_components/api-check/dist/api-check.js',
      'bower_components/angular-formly/dist/formly.js',
      'bower_components/angular-formly-templates-ionic/dist/angular-formly-templates-ionic.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/ionic/js/ionic.js',
      'bower_components/ionic/js/ionic-angular.js',
      'bower_components/ngCordova/dist/ng-cordova.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/sinon/index.js',
      'bower_components/bardjs/dist/bard.js',
      'bower_components/bardjs/dist/bard-ngRouteTester.js',
      // endbower

      // ngCordova mocks (not pulled in by wiredep)
      'bower_components/ngCordova/dist/ng-cordova-mocks.js',


      // app files get loaded from gulp inject

      // inject:js
      "www/app/app.js",
      "www/app/constants.js",
      "www/app/obapp.config.js",
      "www/app/routes.js",
      "www/app/account/account-ctrl.js",
      "www/app/factories/authInterceptor.js",
      "www/app/factories/underscore.js",
      "www/app/home/home-ctrl.js",
      "www/app/iOS9Patch/angular-ios9-uiwebview.patch.js",
      "www/app/iOS9Patch/ionRadio.js",
      "www/app/location/geoLocation-ctrl.js",
      "www/app/login/login-ctrl.js",
      "www/app/notifications/notifications-ctrl.js",
      "www/app/register/register-ctrl.js",
      "www/app/results/searchResultDetails-ctrl.js",
      "www/app/results/searchResults-ctrl.js",
      "www/app/search/recent-search-ctrl.js",
      "www/app/search/search-ctrl.js",
      "www/app/services/authService.js",
      "www/app/services/dataService.js",
      "www/app/services/formService.js",
      "www/app/services/mailService.js",
      "www/app/services/notificationService.js",
      "www/app/services/userService.js",
      // endinject

      // lib helpers
      'www/test/lib/**/*.js',

      // test files
      'www/test/client/**/*.js'

    ],


    // list of files to exclude
    exclude: [
      //'www/app/services/notificationService.js'

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    }
  });
};
