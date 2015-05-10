(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['$q', '$location', '$timeout', 'config', 'logger', 'UserRepository', 'CLIENT_URLS'];

    function User($q, $location, $timeout, config, logger, UserRepository, CLIENT_URLS) {
        /*jshint validthis: true */
        var vm = this;
        vm.userRegister = userRegister;
        vm.editUserProfile = editUserProfile;

        var madeUpUserId = 123;
        var userProfile = {};

        activate();

        // Setup and activate the module
        function activate() {
            UserRepository.getUserProfileData(madeUpUserId).then(function(data){
                vm.userProfile = data;
            });

            logger.info('Activated User Module.');
        }


        function editUserProfile(formData)
        {
            var errorsArr = [];



            logger.info(formData);
        }


        function userRegister(formData)
        {
            var errorsArr = [];

            errorsArr = UserRepository.validateUserRegistration(formData);

            // No errors, register user
            if(errorsArr.length == 0) {

                logger.info("userRegister() client-side validation has passed!");

                UserRepository.createNewUserAccount(formData).then(function (response){
                    //Success, redirect to profile page
                    $location.path(CLIENT_URLS.userProfile);

                }, function(response) {
                    // Valid status code
                    if(response.status) {
                        errorsArr.push(response.message);
                    }else{
                        var errorMsg = "User creation failed! Please try again later."
                        errorsArr.push(errorMsg);
                    }
                });
            }

            vm.formErrors = errorsArr;
        }

    };

})();