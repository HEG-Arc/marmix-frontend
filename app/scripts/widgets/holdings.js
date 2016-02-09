'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('holdings', {
        title: 'Holdings',
        description: 'Displays current holdings',
        template: 'TODO',
        edit: {
            template: ' '
        },
        controller: function($scope, marmixData){
            $scope.data = marmixData;
        },
      });
  });