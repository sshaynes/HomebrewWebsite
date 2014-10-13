'use strict';

/* Directives */

angular.module('brewApp.directives', []).
directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  }
}]).
directive('ngHeader', function () {
    return {
        restrict: 'A', //This will be used as attribute and NOT as an element
        replace: true,
        scope: {user: '='},
        templateUrl: "/static/partials/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Behaviour goes here :)
        }]
    }
}).
directive('ngFooter', function () {
    return {
        restrict: 'A', //This will be used as attribute
        replace: true,
        templateUrl: "/static/partials/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Behaviour goes here :)
        }]
    }
});