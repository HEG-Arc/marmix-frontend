'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marmixApp
TODO Pour le moment, les fichiers json sont en local, dans le dossier "app". Il faudra faire le lien avec la REST API de marmix.
*/
angular.module('marmixApp')
  .controller('MainCtrl', function ($scope, $http) {

    //hacks
    $http.post('https://m3.marmix.ch/api/v1/auth/login/',
      {username:'marmix', password:prompt('password')}
    )
    .then(function(result){
      console.log('test');
      console.log(result);
      $http.get('https://m3.marmix.ch/api/v1/holdings/')
      .success(function(result) {
        $scope.holdings = result.stocks;
         $scope.clock = result.clock;
      });
    });  
    $http.get('https://m3.marmix.ch/api/v1/stocks/')
    .success(function(dataStocks) {
      $scope.stocks = dataStocks.results;
    });
    $http.get('https://m3.marmix.ch/api/v1/orders/')
    .success(function(dataOrders) {
      $scope.orders = dataOrders.results;
    });	
});
