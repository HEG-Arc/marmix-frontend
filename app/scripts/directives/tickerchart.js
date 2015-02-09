'use strict';

/**
 * @ngdoc directive
 * @name marmixApp.directive:tickerChart
 * @description
 * # tickerChart
 */
angular.module('marmixApp')
  .directive('tickerChart', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the tickerChart directive');
      }
    };
  });
