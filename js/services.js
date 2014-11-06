'use strict';

/* Services */


angular.module('brewApp.services', [])
.value('version', '0.1')
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
.factory('githubService', ['$http', function($http)
{
  var doRequest = function(username, path) {
    return $http({
      method: 'JSONP',
      url: 'https://api.github.com/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
    });
  }
  return {
    events: function(username) { return doRequest(username, 'events'); },
  };
}])

// Figure out how to implement and use this service
.factory('AuthService', function ($http, Session) {
  var authService = {};

  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
})

// Refactor this to look like the authService
  .factory('userRepository', ['$http', function($http)
  {
    // status: code
    // message: error message
    var curApiResponse = {};
    var arrApiResponses = [{}];

    return{
      registerNewUser: function(formData)
      {

        // Testing User Create API
        return $http({
          url: 'user/create/',
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
          return {status: response.status, message: response.message};
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          // console.log('ERROR: ' + status + " - " + data);
          return {status: status, message: data};
        });
      },

      loginUser: function(formData)
      {
        // Testing User Create API
        return $http({
          url: 'auth/login/',
          method: "POST",
          data:
            {
              user: formData.username,
              password: formData.password
            },
        }).
        success(function (apiResponse) {
          return {status: apiResponse.status, message: apiResponse.message};
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          // console.log('ERROR: ' + status + " - " + data);
          return {status: status, message: data};
        });

        // return curApiResponse;
      },

      getAllUsers: function()
      {
        $http({
          url: 'auth/login/',
          method: "GET",
          params: {
            user: 'Mike Doe',
            password: 'IAnyOPbXrZhDbe0Li762ZFeDSKL4LKdk'
          }
        }).success(function (login) {
          arrApiResponses.push({name:'login_GET', response: login});
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          arrApiResponses.push({name:'login_GET', response: 'ERROR: ' + status});
        });

        $http({
          url: 'auth/login/',
          method: "POST",
          data: {
            user: 'zdrav2',
            password: '123'
          },
        }).success(function (login) {
          arrApiResponses.push({name:'login_POST', response: login});
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          arrApiResponses.push({name:'login_POST', response: 'ERROR: ' + status + " / " + data});
        });


        $http.get("auth/logout/").success(function (logout) {
          arrApiResponses.push({name:'logout', response: logout});
        });

        $http.get("auth/passwordReset/").success(function (passwordReset) {
          arrApiResponses.push({name:'passwordReset', response: passwordReset});
        });

        $http.get("auth/isSessionActive/").success(function (isSessionActive) {
          arrApiResponses.push({name:'isSessionActive', response: isSessionActive});
        });




        $http.get("user/delete/").success(function (usersDelete) {
          arrApiResponses.push({name:'usersDelete', response: usersDelete});
        });

        $http.get("user/updatePassword/").success(function (updatePassword) {
          arrApiResponses.push({name:'updatePassword', response: updatePassword});
        });

        $http.get("user/updateProfile/").success(function (updateProfile) {
          arrApiResponses.push({name:'updateProfile', response: updateProfile});
        });

        return arrApiResponses;
      }
    };
 }]);
