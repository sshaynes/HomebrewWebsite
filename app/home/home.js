(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('Home', Home);

    Home.$inject = ['config', 'logger'];

    function Home(config, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.appTitle = config.appTitle;
        vm.welcomeMessage = config.appWelcomeMessage;

        activate();

        function activate() {
            // logger.success('Home' + ' loaded!', null);
        }

    };

})();