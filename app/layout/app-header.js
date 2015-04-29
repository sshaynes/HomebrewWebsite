(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('appHeader', appHeader);

    /* @ngInject */
    function appHeader () {
        //Usage:
        //<div app-header appTitle="vm.map.title"></div>
        var directive = {
            scope: {
                'appTitle': '=',
            },
            templateUrl: "/static/app/layout/header.html",
            restrict: 'A'
        };

        return directive;
    }

})();
