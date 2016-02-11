'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('bookoforders', {
        title: 'Book of Orders',
        description: 'Displays the current market orders',
        templateUrl: 'views/widget_bookoforders.html',
        controller: ['$scope', 'marmixData', 'config', function($scope, marmixData, config){
            $scope.data = marmixData;
            $scope.dashboard = marmixData.findDashboard($scope);

            function findMarketIndex(list){
                for(var i=0; i < list.length; i++){
                    if(list[i].order_type === 'MARKET'){
                        return i;
                    }
                }
            }

            $scope.limitList = function(list){
                if(config.threshold && list){
                    var idx = findMarketIndex(list);
                    var from = Math.max(0, idx - config.threshold);
                    var to = Math.min(list.length, idx + config.threshold);
                    return list.slice(from, to);
                }
                return list;
            };

            function registerBookOfOrderUpdate(id){
                marmixData.booksoforders[id] = [];
                marmixData.updateStockBook(id);
                var stock = marmixData.getStock(id);
                //hack title
                if (stock) {
                    $scope.$parent.model.title = $scope.$parent.content.title + ': ' + stock.symbol;
                }
            }

            if(config.symbol){
                marmixData.getStockPromiseFromSymbol(config.symbol).then(function(stock){
                    $scope.stockID = stock.id;
                    registerBookOfOrderUpdate($scope.stockID);
                });
            } else {
                $scope.$watch('dashboard.currentStock.id', function(){
                    if($scope.dashboard.currentStock.id) {
                        registerBookOfOrderUpdate($scope.dashboard.currentStock.id);
                    }
                });
            }

        }],
        edit: {
            templateUrl: 'views/widget_edit_bookoforders.html',
             controller: ['$scope', 'marmixData', function($scope, marmixData){
                $scope.data = marmixData;
            }]
        }
      });
  });