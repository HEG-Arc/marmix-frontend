'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marmixApp
*/
angular.module('marmixApp')
.controller('MainCtrl', function ($scope, $http, $modal, marmixData) {
    $scope.data = marmixData;
    $scope.order = function(stockID, type){
      var modalInstance = $modal.open({
        templateUrl: 'orderModalContent.html',
        controller: 'OrderInstanceCtrl',
        size: 'sm',
        resolve: {
          order: function(){
            return {
              stock_id: stockID,
              type: type,
              price: null,
              quantity: 1
            };
          }
        }
      });
    
    };
})
.controller('OrderInstanceCtrl', function ($scope, $modalInstance, order, marmixData) {
  $scope.stock = marmixData.getStock(order.stock_id);
  $scope.order = order;
  $scope.ok = function () {
    $modalInstance.close();
    marmixData.sendOrder($scope.order);
    console.log('order');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});