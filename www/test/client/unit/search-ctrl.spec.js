describe('Search Controller', function () {
  var controller;
  var view = 'app/account/tab-search.html';



  beforeEach(function () {
    module('OBApp', 'myMocks');
  });

  // required to mock out ngCordova
  beforeEach(function () {
    module('ngCordovaMocks');
  });

  beforeEach(function () {
    // using bardjs library to make injecting easier
    bard.inject(function ($controller, $log, $q, $rootScope, $ionicViewService, $window,
                          $state, $httpBackend, $templateCache, $location, API, userService,
                          authService, authInterceptor, formService) {

      controller = $controller('SearchCtrl', {});
      $httpBackend.whenGET('app/core/tabs.html').respond(200);
      $httpBackend.whenGET('app/home/tab-home.html').respond(200);
      $httpBackend.whenGET('app/layout/menu-layout.html').respond(200);
      $httpBackend.whenGET('app/register/register.html').respond(200);
      $httpBackend.whenGET('app/results/tab-search-result-details.html').respond(200);
      $httpBackend.whenGET('app/results/tab-search-results.html').respond(200);
      $httpBackend.whenGET('app/search/recent-search.html').respond(200);
      $httpBackend.whenGET('app/login/login.html').respond(200);
      $httpBackend.whenGET(API + '/search-form').respond(200);
      $httpBackend.whenGET('app/emailTemplate/emailTemplate.html').respond(200);



    });
  });

  beforeEach(function(){
    // set isAuthenticated to true to avoid having to set tokens or login
    var stub = sinon.stub(authService);
    stub.isAuthenticated.returns(true);
  });


  afterEach(function () {
  });

  it('should be created successfully', function () {
    expect(controller).to.be.defined;
  });

  it('should try to redirect to menu.tabs.results state when search is clicked', function () {
    var spy = sinon.spy($state, 'go');
    controller.search();
    $httpBackend.flush();
    expect(spy).to.have.been.calledOnce.and.calledWith('menu.tabs.results');
  });

  it('should try to redirect to menu.tabs.recent-search state when  recent searches is clicked', function () {

    var spy = sinon.spy($state, 'go');
    controller.recentSearches();
    $httpBackend.flush();
    $rootScope.$apply();
    expect(spy).to.have.been.calledOnce.and.calledWith('menu.tabs.recent-search');
  });

  // TODO: un-skip this when real backend implemented
  xit('should populate formFields with data when controller loads', function () {
    $httpBackend.whenGET(API + '/search-form').respond(200);
    var spy = sinon.spy($state, 'go');
    controller.activate();
    $httpBackend.flush();
    expect(controller.formFields).to.be.an('object');
  });


});
