(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$state', 'notificationService'];

  /* @ngInject */
  function HomeCtrl($state, notificationService) {
    /* jshint validthis: true */
    var vm = this;
    vm.title = '';  
    vm.notificationGroups = {};
    
    vm.activate = activate;
    vm.showNotifications = showNotifications;
    
    function showNotifications(){
      $state.go('menu.tabs.notifications');
    }
    
    activate();

    ////////////////

    function activate() {
      vm.notificationGroups = notificationService.getNotificationGroups();
    }
  }

})();