'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('bookoforders', {
        title: 'Book of Orders',
        description: 'Displays the current market orders',
        templateUrl: 'views/widget_bookoforders.html',
        controller: function($scope, marmixData, config){
            $scope.data = marmixData;
            $scope.dashboard = marmixData.findDashboard($scope);

            function registerBookOfOrderUpdate(id){
                marmixData.booksoforders[id] = true;
                marmixData.updateStockBook(id);
            }

            if(config.stockID){
                registerBookOfOrderUpdate(config.stockID);
            } else {
                $scope.$watch('dashboard.currentStock.id', function(){
                    if($scope.dashboard.currentStock.id) {
                        registerBookOfOrderUpdate($scope.dashboard.currentStock.id);
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