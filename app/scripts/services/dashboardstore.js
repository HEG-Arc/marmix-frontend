'use strict';

/**
 * @ngdoc service
 * @name marmixApp.dashboardStore
 * @description
 * # dashboardStore
 * Service in the marmixApp.
 */
angular.module('marmixApp')
  .service('dashboardStore', function (marmixData, $q, $timeout) {

    var self = this;
    self.init = false;

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

    function createDefaultDashboards(){
        return [
            self.create(),
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
    }

    function loadLocalDashboards(){
        //showlocal
        var dashboards = localStorage.getItem('dashboard');
        if (!dashboards) {
            self.dashboards = createDefaultDashboards();
            self.saveDashboards();
        } else {
            self.dashboards = angular.fromJson(dashboards);
        }
        self.init = true;
    }

    //INIT
    marmixData.getDashboards().then(
        function (result){
            try {
                self.dashboards = angular.fromJson(result.data.dashboard);
                if(!angular.isArray(self.dashboards) || !self.dashboards[0].title) {
                    loadLocalDashboards();
                }
                self.init = true;
            } catch(e) {
                loadLocalDashboards();
            }
        },
        loadLocalDashboards
    );

    this.getDashboard = function(id){
        var deferred = $q.defer();
        function checkModel(){
            if(self.init){
                var model = self.dashboards[id];
                if (!model){
                    model = self.create();
                    self.saveDashboard(id, model);
                } else {
                    model = self.dashboards[id];
                }
                deferred.resolve(model);
            } else {
                $timeout(checkModel, 100);
            }
        }
        checkModel();
        return deferred.promise;
    };

    this.removeDashboard = function(id) {
        this.dashboards.splice(id, 1);
        this.saveDashboards();
    };

    this.saveDashboards = function(){
        var dashboardsJSON = angular.toJson(this.dashboards);
        localStorage.setItem('dashboard', dashboardsJSON);
        marmixData.saveDashboards(dashboardsJSON);
    };

    this.saveDashboard = function(id, model){
        this.dashboards[id] = model;
        this.saveDashboards();
    };
  });
