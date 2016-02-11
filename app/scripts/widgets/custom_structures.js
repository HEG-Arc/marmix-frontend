'use strict';

angular.module('marmixApp')
  .config(function(dashboardProvider){

    dashboardProvider
      .structure('8-4', {
        rows: [{
          columns: [{
            styleClass: 'col-md-8',
            widgets: []
          }, {
            styleClass: 'col-md-4',
            widgets: []
          }]
        }]
      })
      .structure('9-3', {
        rows: [{
          columns: [{
            styleClass: 'col-md-9',
            widgets: []
          }, {
            styleClass: 'col-md-3',
            widgets: []
          }]
        }]
      });

  });
