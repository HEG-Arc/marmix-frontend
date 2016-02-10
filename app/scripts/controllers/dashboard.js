'use strict';

/**
 * @ngdoc function
 * @name marmixApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the marmixApp
 */
angular.module('marmixApp')
  .controller('DashboardCtrl', function ($scope) {
    var self = this;
    //TODO from http
    this.name = 'test';
    var model = localStorage.getItem('dashboard');
    if (!model) {
        this.model = {
            title: 'New Sample',

            titleTemplateUrl : 'views/custom-dashboard-title.html',
            structure: '4-8',
            rows: [{
                columns: [{
                    styleClass: 'col-md-4',
                    widgets: []
                },{
                    styleClass: 'col-md-8',
                    widgets: []
                }]
            }]
        };
    } else {
        this.model = angular.fromJson(model);
    }

    this.currentStock = {};

    this.setCurrentStock = function(stockID){
        if (stockID) {
            self.currentStock.id = stockID;
            //TODO update?
        } else {
            delete self.currentStock.id;
        }
        self.history = [];
    };

    $scope.$on('adfDashboardChanged', function(event, name, model) {
      //TODO move to service and http
      localStorage.setItem('dashboard', angular.toJson(model));
    });
  });
