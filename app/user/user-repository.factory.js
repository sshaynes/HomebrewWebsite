(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('UserRepository', UserRepository);

    /* @ngInject */
    function UserRepository($http, $location, $q, exception, logger, API_URLS) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getUserProfileData: getUserProfileData,
            createNewUserAccount: createNewUserAccount,
            validateUserRegistration: validateUserRegistration,
            ready: ready
        };

        return service;

        function getUserProfileData(userId) {

            var userProfile = {}

            userProfile.username = "ztyankov";
            userProfile.first_name = "Zdravko";
            userProfile.last_name = "Tyankov";
            userProfile.experience = 149;
            userProfile.email = "ztiankov@gmail.com";

            return $q.when(userProfile);
        }


        /**
         * Send a request to the server to create a new user account
         *
         * @param  array formData - user form data
         * @return object response - contains a status code and a message
         */
        function createNewUserAccount(formData) {
            var defer = $q.defer();

            // Testing User Create API
            $http({
                url: API_URLS.userCreate,
                method: "POST",
                data:
                {
                    user: formData.username,
                    password: formData.password,
                    email: formData.email,
                    age: '26',
                    location: 'Philadelphia',
                    yearsExperience: '4',
                    avatarURL: 'http://avatar.com'
                },
            }).
            success(function (response) {
                if(response.status == 200){
                    logger.success("User creation was successful!");
                    defer.resolve({status: response.status, message: response.message});
                }
                else {
                    logger.error("User creation failed!\n" + response.status + ": " + response.message);
                    defer.reject({status: response.status, message: response.message});
                }
            }).
            error(function(response) {
                logger.error("User creation API call failed!");
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
        function validateUserRegistration(formData){
            var errorsArr = [];

            if (!formData.username) {
                errorsArr.push('Username is Required!');
            }

            if (!formData.email) {
                errorsArr.push('Email is Required!');
            }

            if (!formData.password) {
                errorsArr.push('Password is Required!');
            }
            else
            {
                if (!formData.confirmPassword) {
                    errorsArr.push('Password Confirmation is Required!');
                }
                else if (formData.password !== formData.confirmPassword) {
                    errorsArr.push('Passwords do NOT match!');
                }
            }

            return errorsArr;
        }


        function getAvengerCount() {
            var count = 0;
            return getAvengersCast()
                .then(getAvengersCastComplete)
                .catch(exception.catcher('XHR Failed for getAvengerCount'));

            function getAvengersCastComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }


        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data??');
            }
        }


        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();