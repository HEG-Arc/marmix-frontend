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
    'ui.bootstrap',
    'ui.bootstrap.modal'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('sessionRecoverer');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
