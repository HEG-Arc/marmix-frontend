'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('dividendes', {
        title: 'Dividendes',
        description: 'Displays dividendes',
        template: 'TODO',
        edit: {
            template: ' '
        },
        controller: function($scope, marmixData){
            $scope.data = marmixData;
        },
      });
  });