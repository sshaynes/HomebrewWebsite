(function() {
    'use strict';

    angular
        .module('shared.auth')
        .service('authService', authService);

    /* @ngInject */
    function authService($http, $location, $q, exception, logger, API_URLS) {
        var isPrimed = false;
        var primePromise;

        var service = {
            userLogin: userLogin,
            validateUserLogin: validateUserLogin,
            ready: ready
        };

        return service;


        /**
         * Send a request to the server for user login
         *
         * @param  array formData - user form data
         * @return object response - contains a status code and a message
         */
        function userLogin(formData) {
            var defer = $q.defer();

            $http({
                url: API_URLS.authLogin,
                method: "POST",
                data:
                {
                    user: formData.username,
                    password: formData.password
                },
            }).
            success(function (response) {
                logger.success("User login was successful!");
                defer.resolve(response);
            }).
            error(function(response) {
                logger.error("User login failed!\n" + response.status + ": " + response.message);
                defer.reject(response);
            });

            return defer.promise;
        }


        /**
         * Validate the user input and return a list of errors if any
         *
         * @param  array formData - user form data
         * @return array - list of errors if any
         */
        function validateUserLogin(formData){
            var errorsArr = [];

            if (!formData.username) {
                errorsArr.push('Username is Required!');
            }

            if (!formData.password) {
                errorsArr.push('Password is Required!');
            }

            return errorsArr;
        }


        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();