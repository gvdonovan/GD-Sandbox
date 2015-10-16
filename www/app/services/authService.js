(function () {
  'use strict';

  angular
    .module('OBApp')
    .factory('authService', authService);

  authService.$inject = ['$window'];

  function authService($window) {
    //TODO: remove this mock token and rely on real backend to create token
    // token was created here with expiration 200 years from now  http://kjur.github.io/jsjws/tool_jwt.html
    var mockToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2p3dC1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG86bWlrZUBleGFtcGxlLmNvbSIsIm5iZiI6MTQ0MTgwOTY2NiwiZXhwIjo3Mjg3OTI2NDAwLCJpYXQiOjE0NDE4MDk2NjYsImp0aSI6ImlkMTIzNDU2IiwidHlwIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9yZWdpc3RlciJ9.';

    return {
      parseJwt: parseJwt,
      saveToken: saveToken,
      getToken: getToken,
      isAuthenticated: isAuthenticated,
      logout: logout
    };


    function parseJwt(token) {
      //TODO: revert to real backend to create token
      token = mockToken;

      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    function saveToken(token) {
      //TODO: revert to real backend to create token
      token = mockToken;

      $window.localStorage['jwtToken'] = token;
    }

    function getToken() {
      return $window.localStorage['jwtToken'];
    }

    function isAuthenticated() {
      var token = getToken();
      if (token) {
        var params = parseJwt(token);
        console.log('params is ', params);
        console.log('new Date().getTime() / 1000 is ', new Date().getTime() / 1000);
        console.log('params.exp is ', params.exp);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
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