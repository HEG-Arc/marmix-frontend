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

    this.create = function () {
        return {
            title: 'Default',
            titleTemplateUrl : 'views/custom-dashboard-title.html',
            structure: '9-3',
            rows: [{
                columns: [{
                    styleClass: 'col-md-9',
                    widgets: [
                        {type: 'holdings'},
                        {type: 'dividends'},
                        {type: 'chart'},
                        {type: 'orders'},
                    ]
                },{
                    styleClass: 'col-md-3',
                    widgets: [
                        {type: 'simclock',
                        config: {sim_round: true, timestamp: true}},
                        {type: 'orderform',
                         config: {
                            'activeSelection': true
                        }},
                        {type: 'bookoforders'}
                    ]
                }]
            }]
        };
    };

    //TODO promise and http
    var dashboards = localStorage.getItem('dashboard');
    if (!dashboards) {
        this.dashboards = [
            this.create(),
            {
            title: 'Demo A F',
            titleTemplateUrl : 'views/custom-dashboard-title.html',
            structure: '12/6-6',
            rows: [{
                columns: [{
                    styleClass: 'col-md-12',
                    widgets: [
                        {type: 'holdings',
                         config: {stock:{ 'AA':true, 'FF': true}}},
                    ]
                }]
            },{
              columns: [{
                    styleClass: 'col-md-6',
                    widgets: [
                        {type: 'chart',
                        config:{
                            symbol: 'AA'
                        }},
                        {type: 'bookoforders',
                        config:{
                            symbol: 'AA',
                            threshold: 5
                        }},
                        {type: 'orderform',
                         config: {
                            'activeSelection': true
                        }},
                    ]
                },{
                    styleClass: 'col-md-6',
                    widgets: [
                        {type: 'chart',
                        config:{
                            symbol: 'FF'
                        }},
                        {type: 'bookoforders',
                        config:{
                            symbol: 'FF',
                            threshold: 5
                        }},
                    ]
                }]
            }]
        }];
    } else {
        this.dashboards = angular.fromJson(dashboards);
    }



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
        this.dashboards.splice(id, 1);
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
