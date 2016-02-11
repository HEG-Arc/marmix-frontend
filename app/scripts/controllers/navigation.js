'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('NavigationCtrl', function (dashboardStore, $location) {
      this.store = dashboardStore;
      this.isActive = function (id){
          return $location.path().split('/').pop() === String(id);
      };
  });
