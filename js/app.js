'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'home'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'profile'});
  $routeProvider.when('/auth', {templateUrl: 'partials/auth.html', controller: 'auth'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
