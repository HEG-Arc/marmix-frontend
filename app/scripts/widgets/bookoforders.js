'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('simclock', {
        title: 'Sim Clock',
        description: 'Displays the current simulation round and day',
        template: 'R{{data.clock.sim_round}}/D{{data.clock.sim_day |numberFixedLen:2 }} - {{data.clock.state}}<br/><small>{{data.holdings.clock.timestamp|date:"medium"}}</small></h2>',
        frameless: true,
        edit: {
            template: ' '
        },
        controller: function($scope, marmixData){
            $scope.data = marmixData;
        },
      });
  });