'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:TickerCtrl
 * @description
 * # TickerCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('TickerCtrl', function ($scope, marmixData) {
    $scope.data = marmixData;
  });
