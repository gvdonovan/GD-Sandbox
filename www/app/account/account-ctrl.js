(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$state', 'authService'];

  /* @ngInject */
  function AccountCtrl($state, authService) {
    /* jshint validthis: true */
    var vm = this;
    
    vm.title = '';
    
    vm.logout = logout;
    
    function logout(){
      authService.logout();
      $state.go('login'); 
    }
  }

})();