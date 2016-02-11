'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('holdings', {
        title: 'Holdings',
        description: 'Displays current holdings',
        templateUrl: 'views/widget_holdings.html',
        controller: ['$scope', 'marmixData', 'config', function($scope, marmixData, config){
            $scope.data = marmixData;
            $scope.stockFilter = function(holding){
                if(config.stock && Object.keys(config.stock).every(function(key){ return config.stock[key];})){
                    return config.stock.hasOwnProperty(holding.symbol) ? config.stock : false;
                }
                return true;
            };
            $scope.dashboard = marmixData.findDashboard($scope);
        }],
        edit: {
            templateUrl: 'views/widget_holdings_edit.html',
            controller: ['$scope', 'marmixData', function($scope, marmixData){
                $scope.data = marmixData;
            }],
        },
      });
  });