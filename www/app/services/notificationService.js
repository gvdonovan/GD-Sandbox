(function () {
  'use strict';
  
  angular
    .module('OBApp')
    .factory('notificationService', notificationService);
    
    notificationService.$inject = ['$rootScope','$http','$cordovaPush', '$cordovaDialogs', '$cordovaMedia'];
    
    function notificationService($rootScope, $http ,$cordovaPush, $cordovaDialogs, $cordovaMedia){
      return {
        register : register,
        getNotificationGroups : getNotificationGroups,
        getLeadCaptureNotifications: getLeadCaptureNotifications,
        get1003Notifications : get1003Notifications
    }
    
    function register(){
      var config = {
          "badge": "true",
          "sound": "true",
          "alert": "true"
      };
      
      $cordovaPush.register(config).then(function (result) {
        storeDeviceToken("ios");
        
        $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
          console.log(JSON.stringify([notification]));
          handleIOS(notification);
        });
      }, function (err) {
        console.log("Register error " + err)
      });
    }
    
    function handleIOS(notification) {
      if (notification.foreground == "1") {
          if (notification.sound) {
              var mediaSrc = $cordovaMedia.newMedia(notification.sound);
              mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
          }
  
          if (notification.body && notification.messageFrom) {
              $cordovaDialogs.alert(notification.body, notification.messageFrom);
          }
          else $cordovaDialogs.alert(notification.alert, "Push Notification Received");
  
          if (notification.badge) {
              $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                  console.log("Set badge success " + result)
              }, function (err) {
                  console.log("Set badge error " + err)
              });
          }
        }
        else {
            if (notification.body && notification.messageFrom) {
                $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
        }
    }
      
    function storeDeviceToken(type) {
        var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $rootScope.regId };
        //TODO: Store the device token
    }

    function getNotificationGroups(){
      return [
        {
        "name": "App",
        "numNew": 0
        },
        {
          "name": "1003",
          "numNew": 1
         },
         {
          "name": "Lead Capture",
          "numNew": 2
         }
       ];
    }
    
    function getLeadCaptureNotifications(){
      return [
        {
          "message": "This is a test lead capture notification.",
          "timesent": "5/5/15",
          "isNew" : true
         },
         {
          "message": "This is another lead capture notification",
          "timesent": "5/10/15",
          "isNew" : false
         }
       ];
      }
      
      function get1003Notifications(){
        return [
        {
          "message": "This is a test 1003 notification.",
          "timesent": "5/5/15",
          "isNew" : true
         },
         {
          "message": "This is another 1003 notification",
          "timesent": "5/10/15",
          "isNew" : false
         }
       ];
      }  
    }
  })();