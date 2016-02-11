'use strict';

/**
 * @ngdoc service
 * @name marmixApp.dashboardStore
 * @description
 * # dashboardStore
 * Service in the marmixApp.
 */
angular.module('marmixApp')
  .service('dashboardStore', function () {
    //TODO promise and http
    var dashboards = localStorage.getItem('dashboard');
    if (!dashboards) {
        this.dashboards = [];
    } else {
        this.dashboards = angular.fromJson(dashboards);
    }

    this.create = function () {
        return {
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
    };

    this.getDashboard = function(id){
        var model = this.dashboards[id];
        if (!model){
            model = this.create();
            this.saveDashboard(id, model);
        } else {
            model = this.dashboards[id];
        }
        return model;
    };

    this.removeDashboard = function(id) {
        this.dashboards.splice(0, 1);
        this.saveDashboards();
    };

    this.saveDashboards = function(){
        localStorage.setItem('dashboard', angular.toJson(this.dashboards));
    };


    // AngularJS will instantiate a singleton by calling "new" on this function
    this.saveDashboard = function(id, model){
        this.dashboards[id] = model;
        this.saveDashboards();
    };
  });
