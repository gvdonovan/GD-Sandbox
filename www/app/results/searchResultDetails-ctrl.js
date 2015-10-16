(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('SearchResultDetailsCtrl', SearchResultDetailsCtrl);

  //SearchResultDetailsCtrl.$inject = [''];

  /* @ngInject */
  function SearchResultDetailsCtrl() {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = '';

    activate();

    ////////////////

    function activate() {
    }


  }

})();