'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:StockCtrl
 * @description
 * # StockCtrl
 * Controller of the marmixApp
TODO Pour le moment, les fichiers json sont en local, dans le dossier "app". Il faudra faire le lien avec la REST API de marmix.
*/
angular.module('marmixApp')
  .controller('StockCtrl', function ($scope, $http, $routeParams) {
    $scope.orderForm = {};
    $scope.stockId = $routeParams.stockId;
    $http.get('stocks.json')
    .success(function(stocks) {
/*
TODO récupérer en fonction de l'id du stock
Pour le moment, je bricole pour prendre un élément précis du stock,
mais ça ne jouera plus si les "id" des stocks changent
*/
      var stock = stocks[$routeParams.stockId-6];
      $scope.stock = stock;
    });
    $http.get('clock.json')
    .success(function(clock) {
      $scope.clock = clock;
    });
  });
