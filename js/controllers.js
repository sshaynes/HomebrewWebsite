'use strict';

/* Controllers */

angular.module('brewApp.controllers', [])
  .controller('home', ['$scope', '$http', '$log', 'githubService', 'userRepository',
  function($scope, $http, $log, githubService, userRepository)
  {
    // $scope.$log = $log;
    // $log.info(githubService.events('ztyankov'));
    // console.log('hello');

    // $scope.apicalls = userRepository.getAllUsers();
    $scope.apicalls = userRepository.registerNewUser();

    // console.log(userRepository.registerNewUser().actions);

    // $scope.apicalls.push();


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

    $scope.formData = {};

    $scope.userRegister = function()
    {
      console.log($scope.formData);

      var errorsArr = [];

      if (!$scope.formData.username) {
        errorsArr.push('Username Required');
      }

      if (!$scope.formData.email) {
        errorsArr.push('Email is Required');
      }

      if (!$scope.formData.password) {
        errorsArr.push('Password is Required');
      }

      if (!$scope.formData.confirmPassword) {
        errorsArr.push('Password Confirmation is Required');
      }

      $scope.formErrors = errorsArr;

      console.log($scope.formErrors);

      // $http({
      //   url: 'user/create/',
      //   method: "POST",
      //   data:
      //     {
      //       user: 'james_bond1',
      //       password: '123',
      //       age: '26',
      //       location: 'Philadelphia',
      //       name: 'James Bond',
      //       yearsExperience: '4',
      //       avatarURL: 'http://avatar.com'
      //     },
      // }).success(function (login) {
      //   restApi.actions.push({name:'userCreate_POST', response: login});
      // }).
      // error(function(data, status, headers, config) {
      //   // called asynchronously if an error occurs
      //   // or server returns response with an error status.
      //   restApi.actions.push({name:'userCreate_POST', response: 'ERROR: ' + status + "/ " + data});
      // });
    }



  }]);