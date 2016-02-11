'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('orders', {
        title: 'Orders',
        description: 'Displays orders',
        templateUrl: 'views/widget_orders.html',
        edit: {
            template: ' '
        },
        controller: ['$scope', 'marmixData', function($scope, marmixData){
            $scope.data = marmixData;
        }]
      });
  });