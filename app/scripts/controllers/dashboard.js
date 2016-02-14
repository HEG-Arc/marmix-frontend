'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('DashboardCtrl', function ($scope, $window, $location, $routeParams, dashboardStore) {
    var self = this;

    dashboardStore.getDashboard($routeParams.id).then(function(model){
        self.model = model;
    });

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

    this.deleteDashboard = function(){
        if($window.confirm('Confirm delete this page?')){
           dashboardStore.removeDashboard($routeParams.id);
           $location.path('/board/0');
        }
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
