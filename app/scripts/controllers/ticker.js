'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:TickerCtrl
 * @description
 * # TickerCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('TickerCtrl', function ($scope, $http, $interval) {
    $scope.data = {
      tickers: {}
    };
    function updateTicker(){
        $http.get('https://m3.marmix.ch/api/v1/tickers/')
        .success(function(data) {
            $scope.data.tickers = data;
        });
    }
    updateTicker();
    var timer = $interval(updateTicker, 15 * 1000);
    $scope.$on(
        '$destroy',
        function() {
            $interval.cancel( timer );
        }
    );
  });
