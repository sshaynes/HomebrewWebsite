(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('appFooter', appFooter);

    /* @ngInject */
    function appFooter () {
        //Usage:
        //<div app-footer appTitle="vm.map.title"></div>
        var directive = {
            scope: {
                'appTitle': '=',
            },
            templateUrl: "/static/app/layout/footer.html",
            restrict: 'A'
        };

        return directive;
    }

})();
