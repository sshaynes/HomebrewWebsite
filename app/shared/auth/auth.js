(function() {
    'use strict';

    angular
        .module('shared.auth')
        .controller('Auth', Auth);

    Auth.$inject = ['$q', '$location', 'logger', 'CLIENT_URLS', 'authService'];

    function Auth($q, $location, logger, CLIENT_URLS, authService) {
        /*jshint validthis: true */
        var vm = this;

        // Public API
        vm.userLogin = userLogin;

        var madeUpUserId = 123;
        var userProfile = {};

        activate();

        // Setup and activate the module
        function activate() {

            logger.info('Activated Auth Module.');
        }


        function userLogin(formData)
        {
            var errorsArr = [];

            errorsArr = authService.validateUserLogin(formData);

            // No errors, register user
            if(errorsArr.length == 0) {

                logger.info("userLogin() client-side validation has passed!");

                authService.userLogin(formData).then(function (response){
                    //Success, redirect to profile page
                    $location.path(CLIENT_URLS.userProfile);

                }, function(response) {
                    // Valid status code
                    if(response.status) {
                        errorsArr.push(response.message);
                    }else{
                        var errorMsg = "User login failed! Please try again later."
                        errorsArr.push(errorMsg);
                    }
                });
            }

            vm.formErrors = errorsArr;
        }

    };

})();