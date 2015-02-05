'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:StockCtrl
 * @description
 * # StockCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('StockCtrl', function ($scope, $http, $routeParams) {
    $scope.stockId = $routeParams.stockId;
    $http.get('stocks.json')
    .success(function(stocks) {
      var stock = stocks[$routeParams.stockId-6]
      $scope.stock = stock;

    });
  });
