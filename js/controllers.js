'use strict';

/* Controllers */

angular.module('brewApp.controllers', [])
  .controller('home', ['$scope', '$http', function($scope, $http)
  {

    var restApi = {};
    restApi.actions = [{}];

    $http.get("auth/login/").success(function (login) {
      restApi.actions.push({name:'login', response: login});
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

    $http.get("user/create/").success(function (usersCreate) {
      restApi.actions.push({name:'usersCreate', response: usersCreate});
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

  }]);