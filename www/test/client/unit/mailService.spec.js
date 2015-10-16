describe('mailService', function () {

  beforeEach(function () {
    bard.appModule('OBApp');
  });
  // required to mock out ngCordova
  beforeEach(function () {
    module('ngCordovaMocks');
  });


  beforeEach(function () {
    bard.inject('$httpBackend', '$q', '$log', '$rootScope', 'mailService', 'API');
    $httpBackend.whenGET('app/core/tabs.html').respond(200);
    $httpBackend.whenGET('app/layout/menu-layout.html').respond(200);
    $httpBackend.whenGET('app/register/register.html').respond(200);
    $httpBackend.whenGET('app/login/login.html').respond(200);
  });

  it('should exist', function () {
    expect(mailService).to.exist;
  });

  it('should have sendSearchResultsEmail defined', function () {
    expect(mailService.sendSearchResultsEmail).to.exist;
  });
  
  it('should have sendSearchResultsEmail defined', function () {
    expect(mailService.sendMobileUrlEmail).to.exist;
  });
  
  it('should have sendSearchResultsEmail defined', function () {
    expect(mailService.sendHomeUrlEmail).to.exist;
  });

  it('should have getResultHtml undefined', function () {
    expect(mailService.getResultHtml).to.not.exist;
  });

});