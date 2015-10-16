// constants.js

/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('OBApp')
        /* The below allows for quick JWT testing. */
        .constant('API', 'http://ob-backend-test.azurewebsites.net');
})();
