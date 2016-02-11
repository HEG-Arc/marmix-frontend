'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('orderform', {
        title: 'Order Form',
        description: 'Displays an order form to buy/sell',
        templateUrl: 'views/widget_orderform.html',
        config: {
            'activeSelection': true
        },
        edit: {
            templateUrl: 'views/widget_edit_orderform.html'
        },
        controller: function($scope, $timeout, marmixData, config){
            $scope.data = marmixData;
            $scope.dashboard = marmixData.findDashboard($scope);

            $scope.alerts = [];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.ok = function (order_type) {
                var order = angular.copy($scope.order);
                order.stock = marmixData.getStock(order.stock.id);
                order.order_type = order_type;
                marmixData.sendOrder(order);
                $scope.alerts.push({
                    type: 'warning',
                    msg: 'Submitted order: ' + order.order_type + ' ' + order.quantity + ' ' + order.stock.symbol
                });
            };

            $scope.reset = function(){
                $scope.order = {
                    stock: {
                        id: undefined
                    },
                    order_type: undefined,
                    price: null,
                    quantity: undefined
                };
            };
            $scope.reset();

            if(config.activeSelection) {
                $scope.$watch('dashboard.currentOrder', function(){
                    if ($scope.dashboard.currentOrder) {
                        $scope.order.order_type = $scope.dashboard.currentOrder.order_type;
                        $scope.order.stock.id = String($scope.dashboard.currentOrder.stockID);
                        $scope.order.quantity = $scope.dashboard.currentOrder.quantity;
                        $scope.order.price = $scope.dashboard.currentOrder.price;
                        $scope.updated = true;
                        $timeout(function() {
                            $scope.updated = false;
                        }, 2000);
                    }
                }, true);
            }
        },
      });
  });