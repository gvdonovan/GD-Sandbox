(function () {
    'use strict';

    angular
        .module('OBApp')
        .factory('formService', formService);

    formService.$inject = ['$http', '$q', '$ionicLoading', '$timeout', 'API'];

    function formService($http, $q, $ionicLoading, $timeout, API) {

        var formData = {};

        return {
            getFormData: getFormData,
            setFormData: setFormData,
            getForm: getForm,
            getResults: getResults
        };

        function getFormData() {
            return formData;
        }

        function setFormData(data) {
            formData = data;
        }

        function getForm() {

            var url = 'https://qa.optimalblue.com/eoriginations/api/search/GetFormData/' + '3435363434' + '/313632333236/' + '36';
            return $http.get(url)
                .then(function (response) {

                    //if purchase
                    var purchasePrice = _.findWhere(response.data.form.pages.$values[0].fields.$values, {
                        key: 'purchasePrice'
                    });
                    if (purchasePrice) {
                        purchasePrice['hideExpression'] = "model.loanPurpose === '111' || model.loanPurpose === '112'";
                    }

                    var downPayment = _.findWhere(response.data.form.pages.$values[0].fields.$values, {
                        key: 'downPayment'
                    });
                    if (downPayment) {
                        downPayment['hideExpression'] = "model.loanPurpose === '111' || model.loanPurpose === '112'";
                    }

                    //if not purchase
                    var loanAmount = _.findWhere(response.data.form.pages.$values[0].fields.$values, {
                        key: 'loanAmount'
                    });
                    if (loanAmount) {
                        loanAmount['expressionProperties'] = {
                            'hide': function ($viewValue, $modelValue, scope) {
                                return scope.model.loanPurpose === '106' || !scope.model.loanPurpose
                            }
                        };
                    }
                    var estimatedValue = _.findWhere(response.data.form.pages.$values[0].fields.$values, {
                        key: 'estimatedValue'
                    });
                    if (estimatedValue) {
                        estimatedValue['expressionProperties'] = {
                            'hide': function ($viewValue, $modelValue, scope) {
                                return scope.model.loanPurpose === '106' || !scope.model.loanPurpose
                            }
                        };
                    }

                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }

        function getResults(criteria) {
            var url = 'https://qa.optimalblue.com/eoriginations/api/search/GetResults';
            return $http.post(url, criteria)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    console.warn('error' + response);
                });
        }
    }
})();
