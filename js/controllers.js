'use strict';

/* Controllers */

angular.module('brewApp.controllers', [])
  .controller('home', ['$scope', '$http', function($scope, $http)
  {

    var restApi = {};
    restApi.actions = [{}];

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


    // Testing User Create API
    $http({
      url: 'user/create/',
      method: "POST",
      data:
        {
          user: 'james_bond1',
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

    $http.get("user/delete/").success(function (usersDelete) {
      restApi.actions.push({name:'usersDelete', response: usersDelete});
    });

    $http.get("user/updatePassword/").success(function (updatePassword) {
      restApi.actions.push({name:'updatePassword', response: updatePassword});
    });

    $http.get("user/updateProfile/").success(function (updateProfile) {
      restApi.actions.push({name:'updateProfile', response: updateProfile});
    });

    $scope.apicalls = restApi;


    // This is a sample To Do list
    var model = {
      user: "Peter"
    };

    $http.get("static/js/data.json").success(function (data) {
      model.items = data;
    });

    $scope.todo = model;

    $scope.countIncomplete = function() {
      var count = 0;
      angular.forEach($scope.todo.items, function(item){
        if(!item.done) {count++;}
      });
      return count;
    }

    $scope.warningLevel = function(){
      return $scope.countIncomplete() < 3 ? "label-success" : "label-warning";
    }

    $scope.addNewItem = function(actionTitle){
      $scope.todo.items.push({action: actionTitle, done: false});
    }
  }])
  .controller('profile', ['$scope', function($scope) {

  }])
  .controller('auth', ['$scope', function($scope) {

    $scope.userRegister = function()
    {
      $http({
        url: 'user/create/',
        method: "POST",
        data:
          {
            user: 'james_bond1',
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
    }



  }]);