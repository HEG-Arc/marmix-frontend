'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('DashboardCtrl', function ($scope, $routeParams, dashboardStore) {
    var self = this;

    this.model = dashboardStore.getDashboard($routeParams.id);

    this.currentStock = {};

    this.setCurrentStock = function(stockID){
        if (stockID) {
            self.currentStock.id = stockID;
        } else {
            delete self.currentStock.id;
        }
        self.history = [];
    };

    this.currentOrder = {
    };

    this.order = function(stockID, order_type, quantity, price){
        this.currentOrder.stockID = stockID;
        this.currentOrder.order_type = order_type;
        this.currentOrder.quantity = quantity;
        this.currentOrder.price = price;
    };

    $scope.$on('adfDashboardChanged', function(event, name, model) {
        dashboardStore.saveDashboard($routeParams.id, model);
    });
  });
