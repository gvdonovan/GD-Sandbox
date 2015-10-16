(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('RecentSearchCtrl', RecentSearchCtrl);

  RecentSearchCtrl.$inject = ['$state'];

  /* @ngInject */
  function RecentSearchCtrl($state) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = '';
    vm.recentSearches = {};
    vm.showResults = showResults;
    
    function showResults(){
      $state.go('menu.tabs.results');
    }
    
    activate();

    ////////////////

    function activate() {
			
    }
  }

})();