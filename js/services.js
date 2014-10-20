'use strict';

/* Services */


angular.module('brewApp.services', [])
  .value('version', '0.1')

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


  .factory('userRepository', ['$http', function($http)
  {
    // status: code
    // message: error message
    var apiResponses = {};
    apiResponses.actions = [{}];
    return {
      registerNewUser: function(formData)
      {

        // Testing User Create API
        $http({
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
          apiResponses = {status: response.status, message: response.message};
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log('ERROR: ' + status + " - " + data);
          apiResponses = {status: response.status, message: response.message};
        });

        return apiResponses;

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
          apiResponses.actions.push({name:'login_GET', response: login});
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          apiResponses.actions.push({name:'login_GET', response: 'ERROR: ' + status});
        });

        $http({
          url: 'auth/login/',
          method: "POST",
          data: [
            {'user': 'James Bond'},
            {'pass': 'ZCQSVkNDO9vnhh5Ggcp7pj8QfdMCsyJ7'}
          ],
        }).success(function (login) {
          apiResponses.actions.push({name:'login_POST', response: login});
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          apiResponses.actions.push({name:'login_POST', response: 'ERROR: ' + status});
        });


        $http.get("auth/logout/").success(function (logout) {
          apiResponses.actions.push({name:'logout', response: logout});
        });

        $http.get("auth/passwordReset/").success(function (passwordReset) {
          apiResponses.actions.push({name:'passwordReset', response: passwordReset});
        });

        $http.get("auth/isSessionActive/").success(function (isSessionActive) {
          apiResponses.actions.push({name:'isSessionActive', response: isSessionActive});
        });




        $http.get("user/delete/").success(function (usersDelete) {
          apiResponses.actions.push({name:'usersDelete', response: usersDelete});
        });

        $http.get("user/updatePassword/").success(function (updatePassword) {
          apiResponses.actions.push({name:'updatePassword', response: updatePassword});
        });

        $http.get("user/updateProfile/").success(function (updateProfile) {
          apiResponses.actions.push({name:'updateProfile', response: updateProfile});
        });

        return apiResponses;
      }
    };
 }]);
