(function () {
    'use strict';

    angular
        .module('OBApp')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$state', '$cordovaEmailComposer', '$cordovaContacts', '$ionicNavBarDelegate',
    'formService', 'mailService', 'authService'];

    /* @ngInject */
    function SearchCtrl($state, $cordovaEmailComposer, $cordovaContacts, $ionicNavBarDelegate, formService, mailService, authService) {
        /* jshint validthis: true */
        var vm = this;

        vm.isLoading = true;
        vm.activate = activate;
        vm.title = '';
        vm.contact = {};
        vm.showError = true;
        vm.logForm = logForm;
        vm.search = search;
        vm.recentSearches = recentSearches;
        vm.formData = {};
        var formFields;


        function logForm(data) {
            console.warn(data);
        }

        function search() {
            formService.setFormData(vm.formData);
            $state.go('menu.tabs.results');
        }

        function recentSearches() {
            $state.go('menu.tabs.recent-search');
        }

        activate();

        function activate() {

            var token = authService.getToken();
            //var params = authService.parseJwt(token);
            
            var params = {
                clientId: '3435363434',
                userId: '313632333236',
                formId: '36'
            };

            setTimeout(function(){
                formService
                    .getForm(params.clientId, params.userId, params.formId)
                    .then(function (data) {
                        vm.formFields = data.form.pages.$values[0].fields.$values;
                        vm.formFields.forEach(function (item) {
                            item.templateOptions.placeholder = item.templateOptions.label;
                        });
                        vm.isLoading = false;
                    });
            }, 2000);
        }
    }
})();
