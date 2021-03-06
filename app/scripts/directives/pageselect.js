'use strict';

angular.module('marmixApp')
    .directive('pageSelect', function() {
      return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope) {
          scope.$watch('currentPage', function(c) {
            scope.inputPage = c;
          });
        }
      };
    });
