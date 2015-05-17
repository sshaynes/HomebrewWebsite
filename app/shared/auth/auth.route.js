(function() {
    'use strict';

    angular
        .module('shared.auth')
        .run(appRun);

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    templateUrl: 'static/app/shared/auth/login.html',
                    controller: 'Auth',
                    controllerAs: 'vm',
                    title: 'User Login',
                    /*
                    settings: { // What is this for???
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Profile'
                    }
                    */
                }
            }
        ];
    }
})();
