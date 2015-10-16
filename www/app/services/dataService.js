(function () {
  'use strict';

  angular
    .module('OBApp')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q', '$ionicLoading', 'API', 'CacheFactory'];

  /* @ngInject */
  function dataService($http, $q, $ionicLoading, API, CacheFactory) {
    // get handle to dataCache being stored in Local Storage or create one
    // change cache maxAge in app.js run function
    var dataCache;
    if(!CacheFactory.get('dataCache')){
      dataCache = CacheFactory('dataCache', {
        deleteOnExpire: 'aggressive',
        onExpire: function (key, value) {
          getData()
            .then(function () {
              console.log("League Data Cache was automatically refreshed.", new Date());
            }, function () {
              console.log("Error getting data. Putting expired item back in the cache.", new Date());
              dataCache.put(key, value);
            });
        }
      });
    } else {
      dataCache = CacheFactory.get('dataCache');
    }

    return {
            
      getColumns: getColumns,
      getGroups: getGroups,
      getData: getData,
      //getProducts: function() {return _.chain(products).groupBy("groupName").sortBy("groupId")},
      //getProducts: function() {return _.chain(products).groupBy("groupName").sortBy("groupId").map(function(value))},
      getProducts: getProducts,
      get: function (id) {
        //for (var i = 0; i < chats.length; i++) {
        //  if (chats[i].id === parseInt(chatId)) {
        //    return chats[i];
        //  }
        //}
        return null;
      }
    };
    
    function getData(forceRefresh) {
      if (typeof forceRefresh === "undefined") {
        forceRefresh = false;
      }

      var deferred = $q.defer();
      var cacheKey = "recentSearches";
      var recentSearchData = dataCache.get(cacheKey);

      if (recentSearchData) {
        console.log("Found data inside cache", recentSearchData);
        deferred.resolve(recentSearchData);
      }
      else {
        $ionicLoading.show({
          template: 'Loading...'
        });

        //TODO: delete these 2 lines when real backend in place
        $ionicLoading.hide();
        deferred.resolve(getMockProducts());

/*      //TODO: uncomment this code block when real backend in place
        //TODO: change this url to OB backend
        $http.get(API + '/products')
          .success(function (data, status) {
            console.log("Received product data via HTTP.", data, status);
            dataCache.put(cacheKey, data);
            $ionicLoading.hide();
            deferred.resolve(data);
          })
          .error(function () {
            console.log('Error while making HTTP call.');
            $ionicLoading.hide();
            deferred.reject();
          });
*/

      }
      return deferred.promise;
    }

    function getColumns() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });

      //TODO: delete these 2 lines when real backend in place
      $ionicLoading.hide();
      deferred.resolve(getMockColumns());

/*
      //TODO: uncomment this code block when real backend in place
      //TODO: change this url to OB backend
      $http.get(API + '/columns')
        .success(function (data, status) {
          console.log("Received column data via HTTP.", data, status);
          $ionicLoading.hide();
          defferred.resolve(data);
        })
        .error(function () {
          console.log('Error while making HTTP call.');
          $ionicLoading.hide();
          deferred.reject();
        });
*/
      return deferred.promise;
    }

    function getGroups() {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: 'Loading...'
      });

      //TODO: delete these 2 lines when real backend in place
      $ionicLoading.hide();
      deferred.resolve(getMockGroups());

      //TODO: uncomment this code block when real backend in place
      /*      //TODO: change this url to OB backend
             $http.get(API + '/groups')
             .success(function (data, status) {
             console.log("Received groups data via HTTP.", data, status);
             $ionicLoading.hide();
             deferred.resolve(data);
             })
             .error(function () {
             console.log('Error while making HTTP call.');
             $ionicLoading.hide();
             deferred.reject();
             });*/
      return deferred.promise;
    }

    function getProducts() {
      return getData().then(function (products) {
        return _.chain(products).groupBy("groupName").map(function (data, key) {
          return {
            group: key,
            products: data
          };
        }).value();
      });
    }
  }


})();

 // THIS  IS MOCK DATA THAT WILL BE DELETED WHEN REAL BACKEND IS IN PLACE
 function getMockGroups() {
   return [
     {"id": "1", "name": "30 Year Peforming Fixed"},
     {"id": "2", "name": "30 Year FHA"},
     {"id": "3", "name": "15 Year Peforming Fixed"}
   ];
 }

 function getMockColumns(){
   return [
     {"id": "rate", "name": "Rate"},
     {"id": "points", "name": "Points"},
     {"id": "apr", "name": "APR"},
     {"id": "months", "name": "Term"},
     {"id": "closing", "name": "Closing"},
     {"id": "rebate", "name": "Rebate"}
   ];
 }

 function getMockProducts() {
   return [
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 1,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "3",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 2,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "13",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 3,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "12",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 4,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "27",
       "months": "360",
       "apr": "3.86 "
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 5,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "9",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 6,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "12",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 7,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "13",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 8,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "11",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "1",
       "groupName": "30 Year Performing Fixed",
       "id": 9,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "29",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "2",
       "groupName": "30 Year FHA",
       "id": 10,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "7",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "2",
       "groupName": "30 Year FHA",
       "id": 11,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "6",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "2",
       "groupName": "30 Year FHA",
       "id": 12,
       "rebate": "$1000",
       "points": "2",
       "rate": "3.500",
       "closing": "18",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "3",
       "groupName": "15 Year Performing Fixed",
       "id": 13,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "16",
       "months": "360",
       "apr": "3.86"
     },
     {
       "groupId": "3",
       "groupName": "15 Year Performing Fixed",
       "id": 14,
       "rebate": "$1000",
       "points": "1",
       "rate": "3.500",
       "closing": "31",
       "months": "360",
       "apr": "3.86"
     }];
 }
