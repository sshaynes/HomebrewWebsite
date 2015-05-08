(function() {
    'use strict';

    angular
        .module('app.recipe')
        .controller('Recipe', Recipe);

    Home.$inject = ['config', 'logger'];

    function Home(config, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.appTitle = config.appTitle;
        vm.welcomeMessage = config.appWelcomeMessage;

        activate();

        function activate() {
            logger.success('RecipeView' + ' loaded!', null);
        }

    };

})();
