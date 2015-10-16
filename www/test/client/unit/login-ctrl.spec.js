describe('Login Controller', function () {
  var controller;
  var view = 'app/login/login.html';

  beforeEach(function () {
    module('OBApp');
  });
  // required to mock out ngCordova
  beforeEach(function () {
    module('ngCordovaMocks');
  });

  beforeEach(function () {
    // using bardjs library to make injecting easier
    bard.inject(function ($controller, $log, $q, $rootScope, $ionicViewService, $window,
                          $state, $httpBackend, $templateCache, $location, $ionicPopup, userService, API) {
      controller = $controller('LoginCtrl');

      $httpBackend.whenGET('app/core/tabs.html').respond(200);
      $httpBackend.whenGET('app/layout/menu-layout.html').respond(401);
      $httpBackend.whenGET('app/account/tab-account.html').respond(401);
      $httpBackend.whenGET('app/notifications/notifications.html').respond(401);
      $httpBackend.whenGET('app/search/recent-search.html').respond(401);
      $httpBackend.whenGET('app/search/tab-search.html').respond(401);
      $httpBackend.whenGET('app/results/tab-search-results.html').respond(401);
      $httpBackend.whenGET('app/results/tab-search-result-details.html').respond(401);
      $httpBackend.whenGET('app/login/login.html').respond(200);
      $httpBackend.whenGET('app/register/register.html').respond(200);
      $httpBackend.whenPOST(API + '/login').respond(200);
    });
  });

  // TODO: un-skip this when real backend implemented
  xit('should have an empty title', function () {
    expect(controller.title).to.equal('');
  });

  it('should be created successfully', function () {
    expect(controller).to.be.defined;
  });

  // TODO: un-skip this when real backend implemented
  xit('should redirect to the register page when register is clicked', function () {
    var spy = sinon.spy($state, 'go');
    controller.register();
    expect(spy).to.have.been.calledOnce.and.calledWith('register');
  });

  // TODO: un-skip this when real backend implemented
  xit('should try to login the user in when login is clicked', function () {
    var spy = sinon.spy(userService, 'login');
    controller.user = {
      username: 'Trent',
      password: 'Password'
    };

    controller.login();       
    expect(spy).to.have.been.calledOnce.and.calledWith(controller.user.username, controller.user.password);
  });
});