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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'smart-table',
    'adf',
    'adf.provider',
    'adf.structures.base',
  ])
  .config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('sessionRecoverer');
    $routeProvider
      .when('/ticker', {
        templateUrl: 'views/ticker.html',
        controller: 'TickerCtrl'
      })
      .when('/clock', {
        templateUrl: 'views/clock.html',
        controller: 'ClockCtrl'
      })
      .when('/board/:id', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/board/0'
      });
  });
