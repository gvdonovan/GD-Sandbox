(function () {
    'use strict';

    angular
        .module('OBApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$timeout', 'userService', 'authService'];

    /* @ngInject */
    function LoginCtrl($state, $ionicLoading, $ionicPopup, $timeout, userService, authService) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = '';
        vm.user = {};

        vm.login = login;

        //if (authService.isAuthenticated()) {
        //    $state.go('menu.tabs.home');
        //}

        function login() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0
            });

            //TODO: delete this block and uncomment the code block below when using real backend for auth
                     $timeout(function(){
                       userService.login(vm.user.username, vm.user.password).then(function(){
                         if (true) {
                         //if(vm.user.username === 'test' && vm.user.password === 'test'){
                           $ionicLoading.hide();
                           vm.user={};
                           $state.go('menu.tabs.home');
                         }else{
                           $ionicLoading.hide();
                           vm.user.password = "";
                           var alertPopup = $ionicPopup.alert({
                             title: 'Login failed!',
                             template: 'Please check your credentials!'
                           });
                         }
                       });
                     }, 750);

            // userService
            //     .login(vm.user.username, vm.user.password)
            //     .then(function () {
            //         if (authService.isAuthenticated()) {
            //             $ionicLoading.hide();
            //             vm.user = {};
            //             $state.go('menu.tabs.home');
            //         } else {
            //             var mockToken =  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IkNsaWVudENvbmZlcmVuY2UiLCJzdWIiOiJDbGllbnRDb25mZXJlbmNlIiwicm9sZSI6IkxvYW4gT2ZmaWNlciIsImNsaWVudElkIjoiMzQzNTM2MzQzNCIsInVzZXJJZCI6IjMxMzYzMjMzMzIzNiIsImZvcm1JZCI6IjM2IiwiaXNzIjoiaHR0cDovL2p3dGF1dGh6c3J2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiMDk5MTUzYzI2MjUxNDliYzhlY2IzZTg1ZTAzZjAwMjIiLCJleHAiOjE0NDc3ODgxMzEsIm5iZiI6MTQ0Nzc4NjMzMX0.MD8iG2Uvy_8Ph1ogmf-mM1oT7gH8YGRnLJfkhvkqAAE';
            //             authService.saveToken(mockToken);
            //             $ionicLoading.hide();
            //             vm.user.password = "";
            //             $ionicPopup.alert({
            //                 title: 'Login failed!',
            //                 template: 'Please check your credentials!'
            //             });
            //         }
            //     });
        }
    }
})();
