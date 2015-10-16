(function(){
  'use strict';
  
	angular
		.module('OBApp')
		.factory('_', underscore);
		
		function underscore(){
			return window._;
		}
  })();