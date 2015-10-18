(function () {
    'use strict';

    angular
        .module('OBApp')
        .controller('SearchResultsCtrl', SearchResultsCtrl);

    SearchResultsCtrl.$inject = ['$timeout', '$cordovaEmailComposer', '$stateParams', 'mailService', 'formService', 'dataService'];

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

        accounting.settings = {
            currency: {
                symbol: "$",   // default currency symbol is '$'
                format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                decimal: ".",  // decimal point separator
                thousand: ",",  // thousands separator
                precision: 0   // decimal places
            },
            number: {
                precision: 3,  // default precision on numbers is 0
                thousand: ",",
                decimal: "."
            }
        }

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

        function activate() {
            var request = buildRequest();
            formService.getResults(request).then(function (data) {
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
                data.results.$values.forEach(function (grp) {
                    groups.push({id: grp.id, name: grp.name});

                    grp.products.$values.forEach(function (item) {
                        products.push({
                            "groupId": grp.id,
                            "groupName": grp.name,
                            "id": item.sortOrder,
                            "rate": accounting.formatNumber(item.rate),
                            "discounts": accounting.formatNumber(item.discounts),
                            "apr": accounting.formatNumber(String(item.apr)),
                            "monthlyPayments": accounting.formatMoney(item.monthlyPayments),
                            "closingCosts": accounting.formatMoney(item.closingCosts),
                            "rebate": accounting.formatMoney(item.rebate)
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
        }

        function buildRequest() {

            var inputs = formService.getFormData();
            //var inputs = $stateParams.formModel;

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
