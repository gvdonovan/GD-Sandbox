describe('Search Result Detail Controller', function () {
  var controller;
  var view = 'app/results/tab-search-result-details.html';


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
                          $state, $httpBackend, $templateCache, $location, API) {
      controller = $controller('SearchResultDetailsCtrl');

      $httpBackend.whenGET('app/core/tabs.html').respond(200);
      $httpBackend.whenGET('app/layout/menu-layout.html').respond(200);
      $httpBackend.whenGET('app/register/register.html').respond(200);
      $httpBackend.whenGET('app/results/tab-search-result-details.html').respond(200);
      $httpBackend.whenGET('app/results/tab-search-results.html').respond(200);
      $httpBackend.whenGET('app/search/recent-search.html').respond(200);

      $httpBackend.whenGET('app/login/login.html').respond(200);
      $httpBackend.whenGET(API + '/search-form').respond(200);

    });
    $templateCache.put(view, '');
  });

  beforeEach(function(){
  });

  it('should be created successfully', function () {
    expect(controller).to.be.defined;
  });
});
