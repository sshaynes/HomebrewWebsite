(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['$q', '$location', 'config', 'logger', 'UserRepository', 'CLIENT_URLS'];

    function User($q, $location, config, logger, UserRepository, CLIENT_URLS) {
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

                logger.info("userRegister client side validation has passed!");

                UserRepository.createNewUserAccount(formData).then(function (response){
                    response = response.data;

                    // Extract the value and create an array of status codes
                    if(response.status == 200) {
                        console.log("Success: " + response.status + " - " + response.message);
                        $location.path(CLIENT_URLS.userProfile);
                    }else{
                        console.log("Fail: " + response.status + " - " + response.message);
                        errorsArr.push(response.message);
                    }
                }, function (response){
                    console.log("Fail: " + response.status + " - " + response.message);
                    errorsArr.push(response.message);
                });
            }

            vm.formErrors = errorsArr;
        }

    };

})();