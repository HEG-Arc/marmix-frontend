'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:ClockCtrl
 * @description
 * # ClockCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('ClockCtrl', function ($scope, $http, $interval) {
    function updateClock(){
        $http.get('https://m3.marmix.ch/api/v1/clock/')
        .success(function(data) {
            $scope.clock = data;
        });
    }
    function updateMarket(){
        $http.get('https://m3.marmix.ch/api/v1/market/')
        .success(function(data) {
            $scope.market = data;
        });
    }
    updateMarket();
    updateClock();
    var timer = $interval(updateClock, 2 * 1000);
    var timer2 = $interval(updateMarket, 2 * 1000);
    $scope.$on(
        '$destroy',
        function() {
            $interval.cancel( timer );
	    $interval.cancel( timer2 );
        }
    );
  });
