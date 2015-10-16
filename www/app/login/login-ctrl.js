(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$state','$ionicLoading', '$ionicPopup', '$timeout', 'userService', 'authService'];

  /* @ngInject */
  function LoginCtrl($state, $ionicLoading,$ionicPopup, $timeout, userService, authService) {
    /* jshint validthis: true */
    var vm = this;

    vm.title = '';
    vm.user = {};

    vm.login = login;
    vm.register = register;
    
    function login(){
      $ionicLoading.show({
          content:'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          showDelay:0
      });

      //TODO: delete this block and uncomment the code block below when using real backend for auth
      //TODO: remove this timeout when real backend implemented
      $timeout(function(){
        userService.login(vm.user.username, vm.user.password).then(function(){
          if(vm.user.username === 'test' && vm.user.password === 'test'){
            $ionicLoading.hide();
            vm.user={};
            $state.go('menu.tabs.home');
          }else{
            $ionicLoading.hide();
            vm.user.password = "";
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
            });
          }
        });
      }, 750);


      //TODO: uncomment this code when returning to real backend for authentication
      /*      userService.login(vm.user.username, vm.user.password).then(function(){
       if(authService.isAuthenticated()){
       $ionicLoading.hide();
       vm.user={};
       $state.go('menu.tabs.home');
       }else{
       $ionicLoading.hide();
       vm.user.password = "";
       var alertPopup = $ionicPopup.alert({
       title: 'Login failed!',
       template: 'Please check your credentials!'
       });
       }
       });
       }*/
    }



    function register(){
      $state.go('register');
    }

    //TODO: uncomment this code when returning to real backend for authentication
    /*
        activate();

        ////////////////

        function activate() {
          if(authService.isAuthenticated()){
            $state.go('menu.tabs.home');
          }
        }
    */
  }

})();