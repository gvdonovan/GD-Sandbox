(function () {
  'use strict';
  
  angular
    .module('OBApp')
    .factory('mailService', mailService);
    
    mailService.$inject = ['_', '$cordovaEmailComposer', '$templateCache'];
    
    function mailService(_, $cordovaEmailComposer, $templateCache){
      return {
        sendSearchResultsEmail: sendSearchResultsEmail,
        sendMobileUrlEmail: sendMobileUrlEmail,
        sendHomeUrlEmail: sendHomeUrlEmail
      };
      
      function sendSearchResultsEmail(data){
        if(!data.groups || !data.columns || !data.products){
          return;
        }
        
        var emailTemplate = getResultHtml(data);

        $cordovaEmailComposer.isAvailable().then(function() {
          var email = {
            subject: 'Optimal Blue Search Results',
            body: emailTemplate,
            isHtml: true
          };
        
          $cordovaEmailComposer.open(email).then(null, function () {
            console.log("User Cancelled...");
          });
        }, function () {
          console.log("Email Composer is not available");
        });
      }
      
      function getResultHtml(data){
        var template = _.template($templateCache.get('app/emailTemplate/emailTemplate.html'));
        var html = '';
           
        for(var i = 0; i < data.groups.length; i++){
          var title = _.template("<h1><%- name %></h1>");
          html+= title({name: data.groups[i].name});

          html += '<table border="1" cellspacing="1" cellpadding="5">';
          html += '<tr>';
          for(var col = 0; col < data.columns.length; col++){
            var cell = _.template("<td><%- colValue %></td>");
            html+= cell({colValue: [data.columns[col].name]});
          }
          html += '</tr>';

          for(var j = 0; j < data.products[i].products.length; j++){
            html+= '<tr>';
            for(var col = 0; col < data.columns.length; col++){
              var cell = _.template("<td><%- colValue %></td>");
              html+= cell({colValue: data.products[i].products[j][data.columns[col].id]});
            }
            html+= '</tr>';
          }
          html += '</table>';
        }
        return template({resultData: html});
      }
      
      function sendMobileUrlEmail(){
        $cordovaEmailComposer.isAvailable().then(function() {
          var email = {
            subject: 'Optimal Blue Mobile Url',
            body: '<a href="www.optimalblue.com">Optimal Blue</a>',
            isHtml: true
          };
          
          $cordovaEmailComposer.open(email).then(null, function () {
            console.log("User Cancelled...");
          });
        }, function () {
          console.log("Email Composer is not available");
        });
      }
      
      function sendHomeUrlEmail(){
        $cordovaEmailComposer.isAvailable().then(function() {
          var email = {
            subject: 'Optimal Blue Home Url',
            body: '<a href="www.optimalblue.com">Optimal Blue</a>',
            isHtml: true
          };
          
          $cordovaEmailComposer.open(email).then(null, function () {
            console.log("User Cancelled...");
          });
        }, function () {
          console.log("Email Composer is not available");
        });
      }
    }
  })();