(function() {
    'use strict';

    angular
        .module('app.core')
        // Binds the name of the Toastr module
        // It's used for notifications
        .constant('toastr', toastr)
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            user: 'user'
        })
})();