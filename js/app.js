'use strict';

// Declare app level module which depends on filters, and services
var brewApp = angular.module('brewApp', [
  'ngCookies',
  'ngRoute',
  'brewApp.filters',
  'brewApp.services',
  'brewApp.directives',
  'brewApp.controllers'
]).
config([
  '$httpProvider',
  '$interpolateProvider',
  '$routeProvider',
  function($httpProvider, $interpolateProvider, $routeProvider)
  {
    // Setting new interpolation signs for AngularJS in order to play nice with Django
    // Django - {{ }}
    // AngularJS - {[{ }]}
    $interpolateProvider.startSymbol("{[{");
    $interpolateProvider.endSymbol("}]}");

    // Setup default headers for POST request in order to play nice with Django
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Set default headers in order to use Django helper method is_ajax() in views
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

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
}]).
run([
  '$http',
  '$cookies',
  function($http, $cookies) {
    // Assign the CSFR token to each ajax call automagically
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}]);


