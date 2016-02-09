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
    'ui.bootstrap.tabs',
    'ui.bootstrap.modal',
    'smart-table',
    'adf',
    'adf.provider',
    'adf.structures.base'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('sessionRecoverer');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/ticker', {
        templateUrl: 'views/ticker.html',
        controller: 'TickerCtrl'
      })
      .when('/clock', {
        templateUrl: 'views/clock.html',
        controller: 'ClockCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
