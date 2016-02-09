'use strict';

/**
 * @ngdoc service
 * @name marmixApp.MarmixData
 * @description
 * # MarmixData
 * Service in the marmixApp.
 */
angular.module('marmixApp')
  .service('marmixData', function marmixData($http, $filter, $interval) {
    var self = this;
    this.holdings = {};
    this.market = [];
    this.orders = [];
    this.currentStock = {};
    this.ordersBook = [];

    this.updateHoldings = function(){
      $http.get('https://m3.marmix.ch/api/v1/holdings/')
      .success(function(data) {
        self.holdings = data;
      });
    };

    this.getStock = function(stockID){
      var i=0;
      for(i=0; i < self.market.length; i++){
        if(self.market[i].id === stockID){
          return self.market[i];
        }
      }
      return undefined;
    };

    //TODO: use promises or other async system.
    this.setCurrentStock = function(stockID){
      if(stockID){
        self.currentStock = {id:stockID, history:[]};
        self.updateStock();
        self.updateStockBook();
      }else{
        self.currentStock = {history:[]};
      }
    };

    this.cancelOrder = function(order){
      $http.delete('https://m3.marmix.ch/api/v1/order/' + order.id + '/')
      .success(function() {
        self.orders.splice(self.orders.indexOf(order), 1);
      });
    };

    this.sendOrder = function(order){
      $http.post('https://m3.marmix.ch/api/v1/order/', order)
      .success(function(data) {
        //patch broken server replies...
        $http.get('https://m3.marmix.ch/api/v1/orders/' + data.id + '/')
        .success(function(orderInstance) {
          self.orders.unshift(orderInstance);
        });
      });
    };

    //get initial data;
    this.updateHoldings();

    this.updateOrders = function(){
        $http.get('https://m3.marmix.ch/api/v1/orders/')
        .success(function(data) {
          self.orders = data;
          self.orders = self.orders.map(decorateOrder);
        });
        $http.get('https://m3.marmix.ch/api/v1/dividends/')
        .success(function(data) {
          self.dividends = data;
        });
    };
    this.updateOrders();

    this.updateMarket = function(){
        $http.get('https://m3.marmix.ch/api/v1/market/')
        .success(function(data) {
          self.market = data.results;
        });
    };
    this.updateMarket();

    this.updateStock = function(){
        if(self.currentStock.id){
            $http.get('https://m3.marmix.ch/api/v1/stocks/' + self.currentStock.id + '/')
            .success(function(data) {
              self.currentStock = data;
              var year = new Date().getYear()+1900;
              self.currentStock.history.filter(function(s){
                return s.sim_day !== 0;
              })
              .forEach(function(s){
                s.date =  new Date(year, s.sim_round + 1, s.sim_day, 0, 0, 0, 0);
              });
            });
        }
    };


    this.updateStockBook = function(){
        if(self.currentStock.id){
            $http.get('https://m3.marmix.ch/api/v1/book/' + self.currentStock.id + '/')
            .success(function(data) {
                self.ordersBook = data;
            });
        }
    };
    this.updateStockBook();


    //TODO: serverside?
    function decorateOrder(order) {
        order.date = 'R' + order.sim_round + '/D' + $filter('numberFixedLen')(order.sim_day, 2);
        order.symbol = order.stock.symbol;
        return order;
    }

    //loop update holdings
    $interval(this.updateHoldings, 5 * 1000);
    $interval(this.updateOrders, 15 * 1000);
    $interval(this.updateMarket, 2 * 1000);
    $interval(this.updateStock, 15 * 1000);
    $interval(this.updateStockBook, 5 * 1000);



    //fake quote updates
    /*
    $interval(function(){
      self.market.forEach(function(s){
        s.price = Number(s.price) * (Math.random()+0.5);
      });
    }, 2000);
    */
  });
