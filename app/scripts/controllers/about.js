'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
