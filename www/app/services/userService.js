(function () {
  'use strict';
  
  angular
    .module('OBApp')
    .factory('userService', userService);
    
    userService.$inject = ['$http', '$q', 'API'];
    
    function userService($http, $q, API){
      return {
        login: login,
        register: register
      };

      //TODO: delete this function when real backend implemented and uncomment code below
      function login(username, password) {
        var deferred = $q.defer();
        deferred.resolve();

        return deferred.promise;
      }
      function register() {
        var deferred = $q.defer();
        deferred.resolve();

        return deferred.promise;

      }

      //TODO: use the login and register functions below when auth backend is implemented
/*
      function login(username, password){
        return $http.post(API + '/login', {
          username: username,
          password: password
        });
      }
      
      function register(username, password){
        return $http.post(API + '/register', {
          username: username,
          password: password
         });
      }
*/
    }
  })();