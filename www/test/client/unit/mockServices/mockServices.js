// use this to mock services or factories

angular.module('myMocks', ['OBApp']).
  config(configure);

function configure($provide) {

  /*
   Augment a service with .decorator
   $provide.decorator('userService', function($delegate) {
   $delegate.login = function() { ... };
   return $delegate;
   });
   */

  // Replace a service with .value
  $provide.value('userService', {
    login: function () {
      return {token: 'fakeToken'};
    }
  });


  $provide.value('authInterceptor', {
    response: function (res) {
      res.data = {};
      // this is a token without expiration
      res.data.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWU5YWUzOTQyNDM4OGRkNGJkNzg4YTEiLCJpYXQiOjE0NDE3MjQ1NjcsImV4cCI6MTQ0MTc0MjU2N30.bqqR28Vb3RA_xY5pW2ZiomP6dzSj0kDkJjn9VtsG-wU';
      authService.saveToken(res.data.token);

      return res;
    }
  });

}