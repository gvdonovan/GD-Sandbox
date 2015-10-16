//TODO: determine if register controller and associated view should be removed from app altogether
(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['$state','$ionicLoading', '$ionicPopup', 'userService', 'authService'];

  /* @ngInject */
  function RegisterCtrl($state, $ionicLoading,$ionicPopup, userService, authService) {
    /* jshint validthis: true */
    var vm = this;

    vm.title = '';
    vm.user = {};

    vm.register = register;
    vm.backToLogin = backToLogin;
    
    function register(){
      $ionicLoading.show({
        content:'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        showDelay:0
      });
      
      userService.register(vm.user.username, vm.user.password).then(function(){
        if(authService.isAuthenticated()){
          $ionicLoading.hide();
          vm.user={};
          $state.go('menu.tabs.home');
        }else{
          $ionicLoading.hide();
          vm.user.password = "";
          vm.user.confirmPassword = "";
          var alertPopup = $ionicPopup.alert({
              title: 'Registration failed!',
              template: 'Please try again!'
          });
        } 
      });
    }
    
    function backToLogin(){
      $state.go('login');
    }
    
    activate();

    ////////////////

    function activate() {
      if(authService.isAuthenticated()){
        $state.go('menu.tabs.home');
      }
    }
  }

})();