'use strict';

angular.module('OBApp', [
  'ionic',
  'formlyIonic',
  'ngCordova',
  'angular-cache',
  'ngIOS9UIWebViewPatch'
])

  .run(function ($http, $ionicPlatform, CacheFactory, notificationService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
      //console.log(notificationService);
      //Register Notfications
      notificationService.register();
    });

    // for Angular-Cache caching in Local Storage
    // TODO: set a realistic maxAge based on OB requirements
    // TODO: karma throws an error with this uncommented. Figure out how to get around this
    if (!CacheFactory.get('defaultCache')) {
      $http.defaults.cache = CacheFactory('defaultCache', {
        storageMode: 'localStorage',
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
      });
    }

  })
  .run(function ($rootScope, $state, $ionicHistory, $location, authService) {
    // re-direct to /search if user refreshes on /results or /recent-seaches
    if ($location.path() === '/results' || $location.path() === '/recent-searches') {
      $location.path('/search');
    }

  //TODO: uncomment this block of code when auth backend implemented
/*    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
      if ('data' in next && 'authenticationNeeded' in next.data) {
        if (!authService.isAuthenticated()) {
          if (next.name !== 'login') {
            event.preventDefault();
            $state.go('login');
          }
        }
      }
    });*/


  })
  .run(function ($templateRequest, formlyConfig) {
    
    $templateRequest('app/emailTemplate/emailTemplate.html');

    formlyConfig.disableWarnings = true;
    apiCheck.globalConfig.disabled = true;


    formlyConfig.templateManipulators.preWrapper.push(function (template, options, scope) {
            // checking to see if type radio
            var radioTypes = ['radio'];
            if (radioTypes.indexOf(options.type) !== -1) {
                return template.replace('ng-repeat="(key, option) in to.options"',
                    'ng-repeat="(key, option) in to.options.$values"');
            }

            // checking to see if type select
            var selectTypes = ['select'];
            if (selectTypes.indexOf(options.type) !== -1) {
                return template.replace('"option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options"',
                    '"option.value as option.name for option in to.options.$values"');
            }

            if (options.type === "nested") {
                return template.replace('options.data.fields', 'options.data.fields.$values');
            }

            return template;
        });


  });

