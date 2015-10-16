describe('notificationService', function () {

  beforeEach(function () {
    bard.appModule('OBApp');
  });
  // required to mock out ngCordova
  beforeEach(function () {
    module('ngCordovaMocks');
  });


  beforeEach(function () {
    bard.inject('$httpBackend', '$q', '$log', '$rootScope', 'notificationService', 'API');
    $httpBackend.whenGET('app/core/tabs.html').respond(200);
    $httpBackend.whenGET('app/layout/menu-layout.html').respond(200);
    $httpBackend.whenGET('app/register/register.html').respond(200);
    $httpBackend.whenGET('app/login/login.html').respond(200);
  });

  it('should exist', function () {
    expect(notificationService).to.exist;
  });
  
  it('should have register defined', function () {
    expect(notificationService.register).to.exist;
  });
  
  it('should have getNotificationGroups defined', function () {
    expect(notificationService.getNotificationGroups).to.exist;
  });
  
  it('should have getLeadCaptureNotifications defined', function () {
    expect(notificationService.getLeadCaptureNotifications).to.exist;
  });
  
  it('should have get1003Notifications defined', function () {
    expect(notificationService.get1003Notifications).to.exist;
  });
  
  it('should have handleIOS undefined', function () {
    expect(notificationService.handleIOS).to.not.exist;
  });
  
  it('should have storeDeviceToken undefined', function () {
    expect(notificationService.storeDeviceToken).to.not.exist;
  });
});