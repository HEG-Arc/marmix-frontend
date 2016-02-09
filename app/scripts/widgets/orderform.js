'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('orderform', {
        title: 'Order Form',
        description: 'Displays an order form to buy/sell',
        template: 'TODO',
        edit: {
            template: ' '
        },
        controller: function($scope, marmixData){
            $scope.data = marmixData;
        },
      });
  });