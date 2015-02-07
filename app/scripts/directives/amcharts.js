'use strict';

/**
 * @ngdoc directive
 * @name marmixApp.directive:amCharts
 * @description
 * # amCharts
 */
angular.module('marmixApp')
  .directive('amCharts', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        element.text('this is the amCharts directive');
      }
    };
  });
