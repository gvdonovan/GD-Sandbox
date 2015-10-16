(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('NotificationsCtrl', NotificationsCtrl);

  NotificationsCtrl.$inject = ['$state', 'notificationService'];

  /* @ngInject */
  function NotificationsCtrl($state, notificationService) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = '';
    vm.notifications = {};
    
    activate();

    ////////////////

    function activate() {
			vm.notifications = notificationService.getLeadCaptureNotifications();
    }
  }

})();