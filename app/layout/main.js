(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Main', Main);

    Main.$inject = ['$timeout', 'config', 'logger'];

    function Main($timeout, config, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.appTitle = config.appTitle;
        vm.welcomeMessage = config.appWelcomeMessage;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;

        activate();

        function activate() {
            logger.success(vm.appTitle + ' loaded!', null);
//            Using a resolver on all routes or dataservice.ready in every controller
//            dataservice.ready().then(function(){
//                hideSplash();
//            });
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                vm.showSplash = false;
            }, 1000);
        }
    };

})();