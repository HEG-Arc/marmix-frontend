'use strict';

/**
 * @ngdoc filter
 * @name marmixApp.filter:startFrom
 * @function
 * @description
 * # startFrom
 * Filter in the marmixApp.
 */
angular.module('marmixApp')
  .filter('startFrom', function () {
    return function(input, start) {
        start = +start; //parse to int
        if(input && input.slice){
            return input.slice(start);
        }
        return  input;
    };
  });
