(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[BrewBold Error] ', //Configure the exceptionHandler decorator
        appTitle: 'BrewBold',
        appWelcomeMessage: 'Welcome to BrewBold!!',
        version: '0.1.0'
    };

    core.value('config', config);

    core.config(configure);

    core.run(scrfTokenConfigure);

    /* @ngInject */
    // function configure ($logProvider, $routeProvider, $httpProvider, $interpolateProvider, routehelperConfigProvider, exceptionHandlerProvider) {
    function configure ($logProvider, $routeProvider, $httpProvider, $interpolateProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = config.appTitle + ': ';

        var resolveAlways = { /* @ngInject */
            ready: function(UserRepository) {
                return UserRepository.ready();
            }
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);

        // Setting new interpolation signs for AngularJS in order to play nice with Django
        // Django - {{ }}
        // AngularJS - {[{ }]}
        $interpolateProvider.startSymbol("{[{");
        $interpolateProvider.endSymbol("}]}");

        // Setup default headers for POST request in order to play nice with Django
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // Set default headers in order to use Django helper method is_ajax() in views
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        // $routeProvider.
        //   when('/home', {
        //     templateUrl: 'static/partials/home.html',
        //     controller: 'home'
        //   });
        // $routeProvider.
        //   when('/profile', {
        //     templateUrl: 'static/partials/profile.html',
        //     controller: 'profile'
        //   });
        // $routeProvider.
        //   when('/login', {
        //     templateUrl: 'static/partials/login.html',
        //     controller: 'auth'
        //   }).
        //   when('/register', {
        //     templateUrl: 'static/partials/register.html',
        //     controller: 'auth'
        //   });
        // $routeProvider.
        //   otherwise({
        //     redirectTo: '/home'
        //   });
    }

    function scrfTokenConfigure($http, $cookies){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    }

})();