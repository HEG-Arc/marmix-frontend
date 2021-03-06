'use strict';

/**
 * @ngdoc service
 * @name marmixApp.MarmixData
 * @description
 * # MarmixData
 * Service in the marmixApp.
 */
angular.module('marmixApp')
  .service('marmixData', function marmixData($http, $q, $filter, $timeout, $interval) {
    var self = this;
    var APIURL = 'https://m3.marmix.ch/api/v1';
    this.holdings = {};
    this.market = [];
    this.orders = [];
    this.booksoforders = {};
    this.stocksDetails = {};
    this.clock = {};

    this.getStock = function(stockID){
      var i=0;
      if(self.market){
        for(i=0; i < self.market.length; i++){
            if(self.market[i].id === Number(stockID)){
            return self.market[i];
            }
        }
      }
      return undefined;
    };

    this.getStockFromSymbol = function(symbol) {
        for(var i=0; i < self.market.length; i++){
            if(self.market[i].symbol === symbol){
                return self.market[i];
            }
        }
    };

    this.getStockPromiseFromSymbol = function(symbol){
        var deferred = $q.defer();
        function loop(time){
            $timeout(function(){
                var stock = self.getStockFromSymbol(symbol);
                if(stock){
                    deferred.resolve(stock);
                } else {
                    if(time > 1000) {
                        deferred.reject('timeout');
                    } else {
                        loop(time + 100);
                    }
                }
            }, time);
        }
        loop(0);

        return deferred.promise;
    };

    this.cancelOrder = function(order){
      $http.delete(APIURL + '/order/' + order.id + '/')
      .success(function() {
        self.orders.splice(self.orders.indexOf(order), 1);
      });
    };

    this.sendOrder = function(order){
      $http.post(APIURL + '/order/', order)
      .success(function(data) {
        //patch broken server replies...
        $http.get(APIURL + '/orders/' + data.id + '/')
        .success(function(orderInstance) {
          self.orders.unshift(orderInstance);
        });
      });
    };

    this.getCurrentUser = function(){
        var deferred = $q.defer();

        if (self.userId) {
            deferred.resolve(self.userId);
        } else {
            $http.get(APIURL + '/current-user/').then(function(results){
                self.userId = results.data.id;
                deferred.resolve(self.userId);
            }, deferred.reject);
        }
        return deferred.promise;
    };

    this.saveDashboards = function(dashboardJson){
      return self.getCurrentUser().then(function(id){
          return $http.put(APIURL + '/users/' + id + '/', {'dashboard': dashboardJson});
      });
    };

    this.getDashboards = function(){
      return self.getCurrentUser().then(function(id){
          return $http.get(APIURL + '/users/' + id + '/');
      });
    };

    this.updateHoldings = function(){
      $http.get(APIURL + '/holdings/')
      .success(function(data) {
        self.holdings = data;
        self.clock = data.clock;
      });
    };

    this.updateOrders = function(){
        $http.get(APIURL + '/orders/')
        .success(function(data) {
          self.orders = data;
          self.orders = self.orders.map(decorateOrder);
        });
        $http.get(APIURL + '/dividends/')
        .success(function(data) {
          self.dividends = data;
        });
    };


    this.updateMarket = function(){
        $http.get(APIURL + '/market/')
        .success(function(data) {
          self.market = data;
        });
    };

    this.updateStock = function(id){
        if(!isNaN(id)){
            $http.get(APIURL + '/stocks/' + id + '/')
            .success(function(data) {
                self.stocksDetails[id] = data;
                var year = new Date().getYear()+1900;
                self.stocksDetails[id].history.filter(function(s){
                    return s.sim_day !== 0;
                })
                .forEach(function(s){
                    s.date =  new Date(year, s.sim_round + 1, s.sim_day, 0, 0, 0, 0);
                });
            });
        }
    };

    this.updateStocksDetails = function(){
        Object.keys(self.stocksDetails).forEach(self.updateStock);
    };

    this.updateStockBook = function(id){
        if(!isNaN(id)){
            $http.get(APIURL + '/book/' + id + '/')
            .success(function(data) {
                self.booksoforders[id] = data;
            });
        }
    };

    this.updateBooksofOrders = function () {
        Object.keys(self.booksoforders).forEach(self.updateStockBook);
    };

    this.findDashboard = function(scope){
        var $dashboardScope = scope;
        while(!$dashboardScope.hasOwnProperty('dashboard')){
            $dashboardScope = $dashboardScope.$parent;
        }
        return $dashboardScope.dashboard;
    };


    //TODO: serverside?
    function decorateOrder(order) {
        order.date = 'R' + order.sim_round + '/D' + $filter('numberFixedLen')(order.sim_day, 2);
        order.symbol = order.stock.symbol;
        return order;
    }

    //loop update holdings
    var updatePooling = false;
    this.startUpdates= function (){
        if(!updatePooling){
            this.updateMarket();
            this.updateHoldings();
            this.updateOrders();
            this.updateBooksofOrders();
            this.updateStocksDetails();

            $interval(this.updateHoldings, 5 * 1000);
            $interval(this.updateOrders, 15 * 1000);
            $interval(this.updateMarket, 5 * 1000);
            $interval(this.updateStocksDetails, 15 * 1000);
            $interval(this.updateBooksofOrders, 5 * 1000);
            updatePooling = true;
        }
    };


    //fake quote updates
    /*
    $interval(function(){
      self.market.forEach(function(s){
        s.price = Number(s.price) * (Math.random()+0.5);
      });
    }, 2000);
    */
  });
