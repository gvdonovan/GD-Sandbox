(function () {
    'use strict';

    angular
        .module('OBApp')
        .factory('formlyConfigHelper', FormlyConfigHelper);

    FormlyConfigHelper.$inject = [];

    /* @ngInject */
    function FormlyConfigHelper() {

        var service = {
            initialize: initialize
        };

        return service;

        function initialize(formlyConfig) {
            initZipCodeType(formlyConfig);
        }

        function initZipCodeType(formlyConfig) {
            formlyConfig.setType({
                name: 'maskedZipCode',
                extends: 'input',
                defaultOptions: {
                    templateOptions: {
                        "label": "Zip Code",
                        "mask": "99999"
                    },
                    ngModelAttrs: {
                        mask: { // the key "ngMask" must match templateOptions.ngMask
                            attribute: 'mask' // this the name of the attribute to be applied to the ng-model in the template
                        },
                        // applies the 'clean' attribute with the value of "true"
                        'true': {
                            value: 'clean'
                        }
                    },
                    // this is how you hook into formly's messages API
                    // however angular-formly doesn't ship with ng-messages.
                    // You have to display these messages yourself.
                    validation: {
                        messages: {
                            mask: '"Invalid input"'
                        }
                    }
                }
            });
        }

    }
})();
