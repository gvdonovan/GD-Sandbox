(function () {
  'use strict';

  angular
    .module('OBApp')
    .controller('GeoLocationCtrl', GeoLocationCtrl);

  GeoLocationCtrl.$inject = ['$cordovaGeolocation'];

  /* @ngInject */
  function GeoLocationCtrl($cordovaGeolocation) {
    /* jshint validthis: true */
    var vm = this;

    vm.getLocation = geoLocation;

    console.log('in GeoLocation Ctrl');

    ////////////////

    function geoLocation() {
      $cordovaGeolocation
        .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
        .then(function (position) {
          console.log("position found");
          vm.position = position;
          // long = position.coords.longitude
          // lat = position.coords.latitude
        }, function (err) {
          console.log("unable to find location");
          vm.errorMsg = "Error : " + err.message;
        });
    }


  }

})();