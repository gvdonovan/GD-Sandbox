describe('dataService', function () {

  beforeEach(function () {
    bard.appModule('OBApp');
  });
  // required to mock out ngCordova
  beforeEach(function () {
    module('ngCordovaMocks');
  });


  beforeEach(function(){
    bard.inject('$httpBackend', '$q', '$log','dataService', '$rootScope', 'API');


  });

  it('should exist', function () {
    expect(dataService).to.exist;
  });

  describe('http requests', function(){
    beforeEach(function(){
      $httpBackend.whenGET('app/core/tabs.html').respond(200);
      $httpBackend.whenGET('app/home/tab-home.html').respond(200);
      $httpBackend.whenGET('app/layout/menu-layout.html').respond(200);
      $httpBackend.whenGET('app/register/register.html').respond(200);
      $httpBackend.whenGET('app/login/login.html').respond(200);
      $httpBackend.whenGET('app/emailTemplate/emailTemplate.html').respond(200);

    });

    //TODO: remove skip when real backend is wired up
    it('getColumns returns a value', function(){
      $httpBackend.when('GET', API + '/columns').respond(200, [{}]);
      dataService.getColumns().then(function(data){
        expect(data).to.exist;
      });
      $rootScope.$apply();
    });

    // TODO: un-skip this when real backend implemented
    xit('getColumns hits /columns', function(){
      $httpBackend.when('GET', API + '/columns').respond(200, [{}]);
      dataService.getColumns().then(function(data){
        expect(data).to.deep.equal([{}]);
      });
      $httpBackend.flush();
    });

    // TODO: un-skip this when real backend implemented
    xit('getData hits /products', function(){
      $httpBackend.when('GET', API + '/products').respond(200, [{}]);
      dataService.getData().then(function(data){
        expect(data).to.deep.equal([{}]);
      });
      $httpBackend.flush();
    });

    // TODO: un-skip this when real backend implemented
    xit('getGroups hits /groups', function(){
      $httpBackend.when('GET', API + '/groups').respond(200, [{groups: 'got data'}]);
      dataService.getGroups().then(function(data){
        expect(data).to.deep.equal([{groups: 'got data'}]);
      });
      $httpBackend.flush();
    });

    // TODO: un-skip this when real backend implemented
    xit('getProducts returns data', function(){
      $httpBackend.when('GET', API + '/products').respond(200, [{}]);
      dataService.getProducts().then(function(data){
        expect(data).to.deep.equal([{group:'undefined', products: [{}]}]);
      });
      $httpBackend.flush();
    });

  });

});