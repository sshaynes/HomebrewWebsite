(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['$q', '$location', 'logger', 'CLIENT_URLS', 'userRepository'];

    function User($q, $location, logger, CLIENT_URLS, userRepository) {
        /*jshint validthis: true */
        var vm = this;
        vm.userRegister = userRegister;
        vm.editUserProfile = editUserProfile;

        var madeUpUserId = 123;
        var userProfile = {};

        activate();

        // Setup and activate the module
        function activate() {
            userRepository.getUserProfileData(madeUpUserId).then(function(data){
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

            errorsArr = userRepository.validateUserRegistration(formData);

            // No errors, register user
            if(errorsArr.length == 0) {

                logger.info("userRegister() client-side validation has passed!");

                userRepository.createNewUserAccount(formData).then(function (response){
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