describe('authService', function () {

  beforeEach(function () {
    bard.appModule('OBApp');
  });
  // required to mock out ngCordova
  beforeEach(function () {
    module('ngCordovaMocks');
  });

  beforeEach(function(){
    bard.inject('$httpBackend', '$q', '$log','$window', 'authService', '$rootScope', 'API');
  });

  beforeEach(function(){
    $httpBackend.whenGET('app/core/tabs.html').respond(200);
  });

  it('should exist', function () {
    expect(authService).to.exist;
  });

  it('should save a token to local storage when saveToken is called', function () {
    authService.saveToken('fakeToken');
    expect($window.localStorage['jwtToken']).to.be.a('string');
  });


  it('should remove token from local storage when logout called', function () {
    authService.saveToken('fakeToken');
    expect(authService.getToken()).to.be.a('string');
    authService.logout();
    expect(authService.getToken()).to.be.a('undefined');
  });

  // TODO: un-skip this when real backend implemented
  xit('should show user isAuthenticated if token not expired', function () {
    // token was created here with expiration 200 years from now  http://kjur.github.io/jsjws/tool_jwt.html
    authService.saveToken('eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2p3dC1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG86bWlrZUBleGFtcGxlLmNvbSIsIm5iZiI6MTQ0MTgwOTY2NiwiZXhwIjo3Mjg3OTI2NDAwLCJpYXQiOjE0NDE4MDk2NjYsImp0aSI6ImlkMTIzNDU2IiwidHlwIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9yZWdpc3RlciJ9.');
    expect(authService.isAuthenticated()).to.be.true;
  });

  // TODO: un-skip this when real backend implemented
  xit('should show user is not Authenticated if token expired', function () {
    // token was created here with expiration set to be before now  http://kjur.github.io/jsjws/tool_jwt.html
    authService.saveToken('eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2p3dC1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG86bWlrZUBleGFtcGxlLmNvbSIsIm5iZiI6MTQ0MTgwODczMCwiZXhwIjoxNDQxODA4NzMwLCJpYXQiOjE0NDE4MDg3MzAsImp0aSI6ImlkMTIzNDU2IiwidHlwIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9yZWdpc3RlciJ9.');
    expect(authService.isAuthenticated()).to.be.false;
  });



});