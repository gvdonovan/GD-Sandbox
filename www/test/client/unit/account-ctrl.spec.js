describe('Account Controller', function () {
  var controller;
  var view = 'app/account/tab-account.html';

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
                          $state, $httpBackend, $templateCache, $location) {
      controller = $controller('AccountCtrl');

      $httpBackend.whenGET('app/account/tab-account.html').respond(200);
      $httpBackend.whenGET('app/notifications/notifications.html').respond(200);
      $httpBackend.whenGET('app/search/recent-search.html').respond(200);
      $httpBackend.whenGET('app/results/tab-search-result-details.html').respond(200);
      $httpBackend.whenGET('app/login/login.html').respond(200);
      $httpBackend.whenGET('app/emailTemplate/emailTemplate.html').respond(200);

    });
  });


  it('should have an empty title', function () {
    expect(controller.title).to.equal('');
  });


  it('should change route to "login" when logout is clicked', function () {
    controller.logout();
    $rootScope.$apply();
    expect($location.path()).to.equal('/login');
  });

  it('should map /profile route to account view template', function () {
    expect($state.get('menu.tabs.profile').views.profile.templateUrl).to.equal(view);
  });

});


