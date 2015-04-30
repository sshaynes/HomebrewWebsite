(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/profile',
                config: {
                    templateUrl: 'static/app/user/profile.html',
                    controller: 'User',
                    controllerAs: 'vm',
                    title: 'User Profile',
                    settings: { // What is this for???
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Profile'
                    }
                }
            }
        ];
    }
})();
