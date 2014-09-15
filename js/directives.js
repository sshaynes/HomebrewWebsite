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
        restrict: 'A', //This means that it will be used as an attribute and NOT as an element
        replace: true,
        scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/static/partials/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
}).
directive('ngFooter', function () {
    return {
        restrict: 'A', //This will be used as an attribute and NOT as an element
        replace: true,
        templateUrl: "/static/partials/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});