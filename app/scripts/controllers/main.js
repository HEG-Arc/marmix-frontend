'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marmixApp
TODO Pour le moment, les fichiers json sont en local, dans le dossier "app". Il faudra faire le lien avec la REST API de marmix.
*/
angular.module('marmixApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('holdings.json')
    .success(function(dataHoldings) {
      $scope.holdings = dataHoldings;
    });
    $http.get('clock.json')
    .success(function(clock) {
      $scope.clock = clock;
    });
    $http.get('stocks.json')
    .success(function(dataStocks) {
      $scope.stocks = dataStocks;
    });
    $http.get('orders.json')
    .success(function(dataOrders) {
      $scope.orders = dataOrders;
    });	
});
