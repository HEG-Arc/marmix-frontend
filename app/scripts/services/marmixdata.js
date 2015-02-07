'use strict';

/**
 * @ngdoc service
 * @name marmixApp.MarmixData
 * @description
 * # MarmixData
 * Service in the marmixApp.
 */
angular.module('marmixApp')
  .service('marmixData', function marmixData($http, $interval) {
    var self = this;
    this.holdings = {};
    this.stocks = [];
    this.orders = [];
    
    this.updateHoldings = function(){
      $http.get('https://m3.marmix.ch/api/v1/holdings/')
      .success(function(data) {
        self.holdings = data;
      });  
    };
    
    this.getStock = function(stockID){
      var i=0;
      for(i=0; i < self.stocks.length; i++){
        if(self.stocks[i].id === stockID){
          return self.stocks[i];
        }
      }
      return undefined;
    };
    
    this.cancelOrder = function(order){
      $http.delete('https://m3.marmix.ch/api/v1/order/' + order.id)
      .success(function() {
        self.orders.splice(self.orders.indexOf(order), 1);
      });
    };
    
    this.sendOrder = function(order){
      $http.post('https://m3.marmix.ch/api/v1/order/', order)
      .success(function(data) {
        //patch broken server replies...
        $http.get('https://m3.marmix.ch/api/v1/orders/' + data.id)  
        .success(function(orderInstance) {
          self.orders.unshift(orderInstance);
        });
      });
    };
    
    //get initial data;
    this.updateHoldings();
    $http.get('https://m3.marmix.ch/api/v1/stocks/')
    .success(function(data) {
      self.stocks = data.results;
      var year = new Date().getYear()+1900;
      self.stocks.forEach(function(stock){
        stock.history.forEach(function(s){
          s.date =  new Date(year, s.sim_round, s.sim_day, 0, 0, 0, 0);
        });
      });
    });
    $http.get('https://m3.marmix.ch/api/v1/orders/')
    .success(function(data) {
      self.orders = data.results;
    });
        
    //loop update holdings
    $interval(this.updateHoldings, 1000);
    
    //fake quote updates
    $interval(function(){
      self.stocks.forEach(function(s){
        s.price = Number(s.price) * (Math.random()+0.5);
      });
    }, 2000);
  });
