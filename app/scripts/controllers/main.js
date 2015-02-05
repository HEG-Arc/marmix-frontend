'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('stocks.json')
    .success(function(dataStocks) {
      $scope.stocks = dataStocks;
    });
    $http.get('orders.json')
    .success(function(dataOrders) {
      $scope.orders = dataOrders;
    });	
});
