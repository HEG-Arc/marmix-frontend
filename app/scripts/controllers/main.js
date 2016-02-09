'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marmixApp
*/
angular.module('marmixApp')
.controller('MainCtrl', function ($scope, $http, $uibModal, marmixData) {
    $scope.data = marmixData;
    $scope.order = function(stockID, type){
      $uibModal.open({
        templateUrl: 'orderModalContent.html',
        controller: 'OrderInstanceCtrl',
        size: 'sm',
        resolve: {
          order: function(){
            return {
              stock: stockID,
              order_type: type,
              price: null,
              quantity: 1
            };
          }
        }
      });
    };
})
.controller('OrderInstanceCtrl', function ($scope, $modalInstance, order, marmixData) {
  $scope.stock = marmixData.getStock(order.stock);
  $scope.data = marmixData;
  $scope.order = order;
  $scope.ok = function () {
    $modalInstance.close();
    marmixData.sendOrder($scope.order);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});