'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('chart', {
        title: 'Chart',
        description: 'Displays chart for a stock',
        templateUrl: 'views/widget_chart.html',
        controller: function($scope, marmixData, config){
            $scope.data = marmixData;
            $scope.dashboard = marmixData.findDashboard($scope);

            function registerStockDetailUpdate(id){
                marmixData.stocksDetails[id] = {history:[]};
                marmixData.updateStock(id);
                var stock = marmixData.getStock(id);
                //hack title
                if(stock) {
                    $scope.$parent.model.title = $scope.$parent.content.title + ': ' + stock.symbol;
                }
            }

            if(config.symbol){
                marmixData.getStockPromiseFromSymbol(config.symbol).then(function(stock){
                    $scope.stockID = stock.id;
                    registerStockDetailUpdate($scope.stockID);
                });
            } else {
                $scope.$watch('dashboard.currentStock.id', function(){
                    if($scope.dashboard.currentStock.id) {
                        registerStockDetailUpdate($scope.dashboard.currentStock.id);
                    }
                });
            }

        },
        edit: {
            templateUrl: 'views/widget_edit_stock_select.html',
             controller: function($scope, marmixData){
                $scope.data = marmixData;
            },
        },
      });
  });