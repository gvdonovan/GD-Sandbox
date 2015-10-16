describe('Register Controller', function () {
  var controller;
  var view = 'app/register/register.html';

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
                          $state, $httpBackend, $templateCache, $location, userService, API) {
      controller = $controller('RegisterCtrl');

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
      $httpBackend.whenPOST(API + '/register').respond(200);
    });
  });


  it('should have an empty title', function () {
    expect(controller.title).to.equal('');
  });

  it('should be created successfully', function () {
    expect(controller).to.be.defined;
  });
  
  it('should redirect to the login page when cancel is clicked', function () {
    var spy = sinon.spy($state, 'go');
    controller.backToLogin();
    expect(spy).to.have.been.calledOnce.and.calledWith('login');
  });
  
  it('should try to register the user when register is clicked', function () {
    var spy = sinon.spy(userService, 'register');
    controller.user = {
      username: 'User',
      password: 'Password'
    };
    
    controller.register();
    expect(spy).to.have.been.calledOnce.and.calledWith(controller.user.username, controller.user.password);
  });
});