describe('Search Results Controller', function () {
  var controller;
  var view = 'app/results/tab-search-results.html';


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
                          $state, $httpBackend, $templateCache, $location, mailService, API) {
      controller = $controller('SearchResultsCtrl');

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
  
  it('should have sendEmail defined', function () {
    expect(controller.sendEmail).to.exist;
  });
  
  it('should have toggleGroup defined', function () {
    expect(controller.toggleGroup).to.exist;
  });
  
  it('should have isGroupShown defined', function () {
    expect(controller.isGroupShown).to.exist;
  });
  
   it('should have an empty title', function () {
    expect(controller.title).to.equal('');
  });
  
   it('should set isLoading to true', function () {
    expect(controller.isLoading).to.equal(true);
  });
  
   it('should have a data object', function () {
    controller.activate();
    expect(controller.data).to.exist;
   });
   
   it('should set the shown group', function () {
    var setGroupObject = {group: "setGroup"};
    var notSetGroupObject = {group: "notSetGroup"};
    controller.toggleGroup(setGroupObject);
    expect(controller.isGroupShown(setGroupObject)).to.equal(true);
    expect(controller.isGroupShown(notSetGroupObject)).to.equal(false);
   });
   
   it('should call the mail service to send an email when send email is clicked', function () {
    var spy = sinon.spy(mailService, 'sendSearchResultsEmail');
    controller.sendEmail();
    expect(spy).to.have.been.calledOnce.and.calledWith(controller.data);
   });
});
