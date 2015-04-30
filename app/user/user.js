(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['$timeout', 'config', 'logger', 'UserRepository'];

    function User($timeout, config, logger, UserRepository) {
        /*jshint validthis: true */
        var vm = this;

        var madeUpUserId = 123;

        getUserProfileData(madeUpUserId);

        function getUserProfileData(userId)
        {
            var userProfile = UserRepository.getUserProfileData(userId);

            vm.userProfile = userProfile;
        }

        function editUserProfile(formData)
        {
          var errorsArr = [];
          logger.info(formData);
        }
    };

})();