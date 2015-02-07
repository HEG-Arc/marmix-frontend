'use strict';

/**
 * @ngdoc directive
 * @name marmixApp.directive:animateOnChange
 * @description
 * # animateOnChange
 */
angular.module('marmixApp')
  .directive('animateOnChange', function ($animate) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.animateOnChange, function(nv,ov) {
          if (nv!==ov) {
            var c = nv > ov?'change-up':'change';
            $animate.addClass(element,c).then(function() {
              $animate.removeClass(element,c);
            });
          }
        });
      }
    };
  });
