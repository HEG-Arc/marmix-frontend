'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('dividends', {
        title: 'Dividends',
        description: 'Displays dividends',
        templateUrl: 'views/widget_dividends.html',
        controller: function($scope, marmixData, config){
            $scope.data = marmixData;
            $scope.stockFilter = function(dividend){
                if(config.stock && Object.keys(config.stock).every(function(key){ return config.stock[key];})){
                    return config.stock.hasOwnProperty(dividend.stock) ? config.stock : false;
                }
                return true;
            };
        },
        edit: {
            templateUrl: 'views/widget_holdings_edit.html',
            controller: function($scope, marmixData){
                $scope.data = marmixData;
            },
        },
      });
  });