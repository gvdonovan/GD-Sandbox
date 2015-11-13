// constants.js

/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('OBApp')
        /* The below allows for quick JWT testing. */
        .constant('API', { url: 'https://qa.optimalblue.com/eOriginations/api' })
	    .constant('TOKEN', { url: 'https://qa.optimalblue.com/eOriginations/mobileAuth' });
})();
