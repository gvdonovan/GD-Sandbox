'use strict';

angular
  .module('OBApp')


  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl as vm'
      })
      .state('logout', {
        cache: false,
        url: 'logout',
        controller: function($state, authService){
          authService.logout();
          $state.go('login');
        }
      })
      .state('menu', {
        abstract: true,
        templateUrl: 'app/layout/menu-layout.html',
        data: {
          authenticationNeeded: true
        }
      })
      .state('menu.tabs', {
        abstract: true,
        views: {
          'tabContent': {
            templateUrl: 'app/core/tabs.html'
          }
        }
      })
      .state('menu.tabs.home', {
        url: '/home',
        views: {
          'home-tab': {
            templateUrl: 'app/home/tab-home.html',
            controller: 'HomeCtrl as vm'
          }
        }
      })
      .state('menu.tabs.geolocation', {
        url: '/location',
        views: {
          'location': {
            templateUrl: 'app/location/geo-location.html',
            controller: 'GeoLocationCtrl as vm'
          }
        }
      })
      .state('menu.tabs.search', {
        url: '/search',
        views: {
          'search-tab': {
            templateUrl: 'app/search/tab-search.html',
            controller: 'SearchCtrl as vm'
          }
        }
      })
      .state('menu.tabs.results', {
        cache: false,
        url: '/results',
        views: {
          'search-tab': {
            templateUrl: 'app/results/tab-search-results.html',
            controller: 'SearchResultsCtrl as vm'
          },
          params: [
            {formModel: {}}
          ]
        }
      })
      .state('menu.tabs.result-detail', {
        url: '/results/:resultId',
        views: {
          'search-tab': {
            templateUrl: 'app/results/tab-search-result-details.html',
            controller: 'SearchResultDetailsCtrl as srd'
          }
        }
      })
    .state('menu.tabs.recent-search', {
        url: '/recent-searches',
        views: {
          'search-tab': {
            templateUrl: 'app/search/recent-search.html',
            controller: 'RecentSearchCtrl as vm'
          }
        }
      })
    .state('menu.tabs.profile', {
        url: '/profile',
        views: {
          'profile': {
            templateUrl: 'app/account/tab-account.html',
            controller: 'AccountCtrl as vm'
          }
        }
      })
      .state('menu.tabs.notifications', {
        url: '/notifications',
        views: {
          'notifications': {
            templateUrl: 'app/notifications/notifications.html',
            controller: 'NotificationsCtrl as vm'
          }
        }
      })
      .state('email-mobile-url', {
        cache: false,
        controller: function($state, mailService){
          mailService.sendMobileUrlEmail();
          $state.go('menu.tabs.home');
        }
      })
      .state('email-home-url', {
        cache: false,
        controller: function($state, mailService){
          mailService.sendHomeUrlEmail();
          $state.go('menu.tabs.home');
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });