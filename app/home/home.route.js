(function() {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'static/app/home/home.html',
                    controller: 'Home',
                    controllerAs: 'vm',
                    title: 'Home',
                    settings: { // What is this for???
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Home'
                    }
                }
            }
        ];
    }
})();
