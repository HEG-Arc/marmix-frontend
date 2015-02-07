'use strict';

/**
 * @ngdoc overview
 * @name marmixApp
 * @description
 * # marmixApp
 *
 * Main module of the application.
 */
angular
  .module('marmixApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/main.html',
        controller: 'AboutCtrl'
      })
      .when('/stock/:stockId', {
        templateUrl: 'views/stock-detail.html',
        controller: 'StockCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
