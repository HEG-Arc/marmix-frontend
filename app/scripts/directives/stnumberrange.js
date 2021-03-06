'use strict';

angular.module('marmixApp')
.directive('stNumberRange', function () {
    return {
        restrict: 'E',
        require: '^stTable',
        scope: {
        },
        templateUrl: 'views/stNumberRange.html',
        link: function (scope, element, attr, table) {
            var inputs = element.find('input');
            var inputLower = angular.element(inputs[0]);
            var inputHigher = angular.element(inputs[1]);
            var predicateName = attr.predicate;

            [inputLower, inputHigher].forEach(function (input) {

                input.bind('blur', function () {
                    var query = {};

                    if (scope.lower) {
                        query.lower = scope.lower;
                    }

                    if (scope.higher) {
                        query.higher = scope.higher;
                    }

                    scope.$apply(function () {
                        table.search(query, predicateName);
                    });
                });
            });
        }
    };
});