(function () {
  'use strict';
  
  angular
    .module('OBApp')
    .factory('authInterceptor', authInterceptor);
    
    authInterceptor.$inject = ['authService', 'API'];
    
    function authInterceptor(authService, API){
      return {
        request: request,
        response: response,
        responseError: responseError
      };
      
      function request(config){
        var token = authService.getToken();
          if(config.url.indexOf(API) === 0 && token) {
            config.headers.Authorization = 'Bearer ' + token;
          }
        
          return config;
      }
      
      function response(res){
        if(res.config.url.indexOf(API) === 0 && res.data.token) {
            authService.saveToken(res.data.token);
          }
        
          return res;
      }
      
      function responseError(res){ }
    }
  })();