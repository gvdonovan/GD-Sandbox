(function () {
    'use strict';

    angular
        .module('OBApp')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q', 'TOKEN', 'authService'];

    function userService($http, $q, TOKEN, authService) {
        return {
            login: login,
        };

//        //TODO: delete this function when real backend implemented and uncomment code below
//              function login(username, password) {
//                var deferred = $q.defer();
//                deferred.resolve();
//
//                return deferred.promise;
//              }
//              function register() {
//                var deferred = $q.defer();
//                deferred.resolve();
//
//                return deferred.promise;
//
//              }

        //TODO: use the login and register functions below when auth backend is implemented

        function login(username, password) {
			var url = 'http://localhost:63050/oauth2/token';

            //return $http.post(TOKEN, {

            //return $http.post(TOKEN.url + '/oauth2/token', {
            //    username: username,
            //    password: password,
				//client_id: '099153c2625149bc8ecb3e85e03f0022',
				//grant_type: 'password'
            //});

            var payload = 'username=' + username + '&password=' + password + '&grant_type=password&client_id=099153c2625149bc8ecb3e85e03f0022';
            return $http
                .post(TOKEN.url + '/oauth2/token', payload, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    authService.saveToken(response.access_token);
                });
        }
    }
})();
