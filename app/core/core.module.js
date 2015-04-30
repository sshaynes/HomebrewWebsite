(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngCookies', 'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'shared.exception',
        'shared.logger',
        'shared.router',
        /*
         * 3rd Party modules
         */
        'ngplus'
    ]);
})();