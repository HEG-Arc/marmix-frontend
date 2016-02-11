'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('simclock', {
        title: 'Sim Clock',
        description: 'Displays the current simulation round and day',
        templateUrl: 'views/widget_simclock.html',
        config: {
            sim_round: true,
            timestamp: true
        },
        edit: {
            templateUrl: 'views/widget_edit_simclock.html'
        },
        controller: ['$scope', 'marmixData', function($scope, marmixData){
            $scope.data = marmixData;
        }]
      });
  });