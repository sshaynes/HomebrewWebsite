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

        .constant('CLIENT_URLS',{
            userProfile: '/profile',
            userLogin: '/login',
            userRegister: '/register',
        })

        .constant('API_URLS',{
            userCreate: 'user/create/',
            userDelete: 'user/delete/',
            userUpdatePassword: 'user/updatePassword/',
            userUpdateProfile: 'user/updateProfile/',
            authLogin: 'auth/login/',
            authLogout: 'auth/logout/',
            authPasswordReset: 'auth/passwordReset/',
            authIsSessionActive: 'auth/isSessionActive/',

        })

        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            user: 'user'
        })
})();