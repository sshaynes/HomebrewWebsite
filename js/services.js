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
    var restApi = {};
    restApi.actions = [{}];
    return {
      registerNewUser: function()
      {
        // Testing User Create API
        $http({
          url: 'user/create/',
          method: "POST",
          data:
            {
              user: 'james_bond2',
              password: '123',
              age: '26',
              location: 'Philadelphia',
              name: 'James Bond',
              yearsExperience: '4',
              avatarURL: 'http://avatar.com'
            },
        }).success(function (login) {
          restApi.actions.push({name:'userCreate_POST', response: login});
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          restApi.actions.push({name:'userCreate_POST', response: 'ERROR: ' + status + "/ " + data});
        });

        return {

        }

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
          restApi.actions.push({name:'login_GET', response: login});
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          restApi.actions.push({name:'login_GET', response: 'ERROR: ' + status});
        });

        $http({
          url: 'auth/login/',
          method: "POST",
          data: [
            {'user': 'James Bond'},
            {'pass': 'ZCQSVkNDO9vnhh5Ggcp7pj8QfdMCsyJ7'}
          ],
        }).success(function (login) {
          restApi.actions.push({name:'login_POST', response: login});
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          restApi.actions.push({name:'login_POST', response: 'ERROR: ' + status});
        });


        $http.get("auth/logout/").success(function (logout) {
          restApi.actions.push({name:'logout', response: logout});
        });

        $http.get("auth/passwordReset/").success(function (passwordReset) {
          restApi.actions.push({name:'passwordReset', response: passwordReset});
        });

        $http.get("auth/isSessionActive/").success(function (isSessionActive) {
          restApi.actions.push({name:'isSessionActive', response: isSessionActive});
        });




        $http.get("user/delete/").success(function (usersDelete) {
          restApi.actions.push({name:'usersDelete', response: usersDelete});
        });

        $http.get("user/updatePassword/").success(function (updatePassword) {
          restApi.actions.push({name:'updatePassword', response: updatePassword});
        });

        $http.get("user/updateProfile/").success(function (updateProfile) {
          restApi.actions.push({name:'updateProfile', response: updateProfile});
        });

        return restApi;
      }
    };
 }]);
