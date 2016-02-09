'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('chart', {
        title: 'Chart',
        description: 'Displays chart for a stock',
        template: 'TODO',
        edit: {
            template: ' '
        },
        controller: function($scope, marmixData){
            $scope.data = marmixData;
        },
      });
  });