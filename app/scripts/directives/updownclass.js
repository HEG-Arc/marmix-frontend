'use strict';

/**
 * @ngdoc directive
 * @name marmixApp.directive:updownClass
 * @description
 * # updownClass
 */
angular.module('marmixApp')
  .directive('updownClass', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.updownClass, function(value) {
          if(value){
            if(value.toString().indexOf('-') > -1){
              element.addClass('down');
              element.removeClass('up');
            }else{
              element.addClass('up');
              element.removeClass('down');
            }
          }
        });
      }
    };
  });
