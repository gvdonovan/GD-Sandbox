(function () {
    'use strict';

    angular
        .module('OBApp')
        .factory('authService', authService);

    authService.$inject = ['$window'];

    function authService($window) {

        var mockToken2 = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2p3dC1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG86bWlrZUBleGFtcGxlLmNvbSIsIm5iZiI6MTQ0MTgwOTY2NiwiZXhwIjo3Mjg3OTI2NDAwLCJpYXQiOjE0NDE4MDk2NjYsImp0aSI6ImlkMTIzNDU2IiwidHlwIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9yZWdpc3RlciJ9.';
        var mockToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IkNsaWVudENvbmZlcmVuY2UiLCJzdWIiOiJDbGllbnRDb25mZXJlbmNlIiwicm9sZSI6IkxvYW4gT2ZmaWNlciIsImNsaWVudElkIjoiMzQzNTM2MzQzNCIsInVzZXJJZCI6IjMxMzYzMjMzMzIzNiIsImZvcm1JZCI6IjM2IiwiaXNzIjoiaHR0cDovL2p3dGF1dGh6c3J2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiMDk5MTUzYzI2MjUxNDliYzhlY2IzZTg1ZTAzZjAwMjIiLCJleHAiOjE0NDc3ODgxMzEsIm5iZiI6MTQ0Nzc4NjMzMX0.MD8iG2Uvy_8Ph1ogmf-mM1oT7gH8YGRnLJfkhvkqAAE';

        return {
            parseJwt: parseJwt,
            saveToken: saveToken,
            getToken: getToken,
            isAuthenticated: isAuthenticated,
            logout: logout
        };


        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        function saveToken(token) {
            $window.localStorage['jwtToken'] = token;
        }

        function getToken() {            
            return mockToken;
            //return $window.localStorage['jwtToken'];
        }

        function isAuthenticated() {
            var token = getToken();

            if (token) {
                var params = parseJwt(token);
                console.log('params is ', params);
                console.log('new Date().getTime() / 1000 is ', new Date().getTime() / 1000);
                console.log('params.exp is ', params.exp);
                //return Math.round(new Date().getTime() / 1000) <= params.exp;
                return  true;
            } else {
                console.log('here');
                return false;
            }
        }

        function logout() {
            $window.localStorage.removeItem('jwtToken');
        }
    }
})();