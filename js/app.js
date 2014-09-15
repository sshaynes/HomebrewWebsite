'use strict';

// Declare app level module which depends on filters, and services
var brewApp = angular.module('brewApp', [
  'ngRoute',
  'brewApp.filters',
  'brewApp.services',
  'brewApp.directives',
  'brewApp.controllers'
], function ($interpolateProvider) {
        $interpolateProvider.startSymbol("{[{");
        $interpolateProvider.endSymbol("}]}");
}).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'static/partials/home.html',
      controller: 'home'
    });
  $routeProvider.
    when('/profile', {
      templateUrl: 'static/partials/profile.html',
      controller: 'profile'
    });
  $routeProvider.
    when('/auth', {
      templateUrl: 'static/partials/auth.html',
      controller: 'auth'
    });
  $routeProvider.
    otherwise({
      redirectTo: '/home'
    });
}]);