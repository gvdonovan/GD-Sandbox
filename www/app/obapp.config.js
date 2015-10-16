'use strict';
  
  angular
    .module('OBApp')
    .config(configure);
    
 configure.$inject = ['$httpProvider', 'CacheFactoryProvider'];
 
 function configure($httpProvider, CacheFactoryProvider){
   $httpProvider.interceptors.push('authInterceptor');
 }