(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('SearchResultsCtrl', SearchResultsCtrl);

  SearchResultsCtrl.$inject = ['$timeout','$cordovaEmailComposer', '$stateParams', 'mailService', 'formService', 'dataService'];

  /* @ngInject */
  function SearchResultsCtrl($timeout, $cordovaEmailComposer, $stateParams, mailService, formService, dataService) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = '';

    vm.data = {};
    vm.isLoading = true;

    vm.sendEmail = sendEmail;
    vm.toggleGroup = toggleGroup;
    vm.isGroupShown = isGroupShown;

    function toggleGroup(group) {
      if (vm.isGroupShown(group)) {
        vm.shownGroup = null;
      } else {
        vm.shownGroup = group;
      }
    }

    function isGroupShown(group) {
      return vm.shownGroup === group;
    }

    function sendEmail() {
      //mailService.sendSearchResultsEmail(vm.data);
    }

    activate();

    ////////////////

    function activate() {
      var request = buildRequest();
      formService.getResults(request).then(function(data){
          console.log(data);
          var groups = [];
          var columns = [
          {id: 'rate', name: 'Rate'},
          {id: 'discounts', name: 'Points'},
          {id: 'apr', name: 'APR'},
          {id: 'monthlyPayments', name: 'Payments'},
          {id: 'closingCosts', name: 'Closing'},
          {id: 'rebate', name: 'Rebate'}
          ];
          var products = [];
          data.results.$values.forEach(function(grp){
            groups.push({id: grp.id, name: grp.name});

            grp.products.$values.forEach(function(item){
              products.push({
                "groupId": grp.id,
                "groupName": grp.name,
                "id": item.sortOrder,
                "rate": item.rate,
                "discounts": item.discounts,
                "apr": item.apr,
                "monthlyPayments": item.monthlyPayments,
                "closingCosts": item.closingCosts,
                "rebate": item.rebate
              });
            });
          });

          products = _.chain(products).groupBy("groupName").map(function (data, key) {
          return {
            group: key,
            products: data
          };
        }).value();

          vm.data.columns = columns;
          vm.data.groups = groups;
          vm.data.products = products;
          vm.isLoading = false;

      });

      // var columns = dataService.getColumns();
      // columns.then(function(columns){
      //   vm.data.columns = columns;
      // });

      // var groups = dataService.getGroups();
      // groups.then(function(groups){
      //   vm.data.groups = groups;
      // });

      // var products = dataService.getProducts();
      // products.then(function(products){
      //   vm.data.products = products;
      //   vm.isLoading = false;
      // });
    }
    
    function buildRequest() {

      //var inputs = formService.getFormData();
      var inputs = $stateParams.formModel;

        var request = {
            clientId: '3431303331',
            userId: '363939343932',
            formId: '32',            
            inputs: inputs
        };
        return request;
    }

  }

})();
