'use strict';

/* Controllers */

angular.module('brewApp.controllers', [])
  .controller('home', ['$scope', '$http', '$log', 'githubService', 'userRepository',
  function($scope, $http, $log, githubService, userRepository)
  {
    $scope.apicalls = userRepository.getAllUsers();
    // $scope.apicalls = userRepository.registerNewUser();

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
  .controller('auth', ['$scope', '$location', 'userRepository', function($scope, $location, userRepository) {

    $scope.formData = {};

    $scope.userRegister = function()
    {
      var errorsArr = [];

      if (!$scope.formData.username) {
        errorsArr.push('Username Required!');
      }

      if (!$scope.formData.email) {
        errorsArr.push('Email is Required!');
      }

      if (!$scope.formData.password) {
        errorsArr.push('Password is Required!');
      }

      if (!$scope.formData.confirmPassword) {
        errorsArr.push('Password Confirmation is Required!');
      }

      if($scope.formData.password !== $scope.formData.confirmPassword) {
        errorsArr.push('Passwords do NOT match!');
      }

      $scope.formErrors = errorsArr;

      var response = {};

      // No errors, register user
      if(errorsArr.length == 0){
        // $location.path('/home');
        // Figure out how to deal with the async execution of this method.
        var response = userRepository.registerNewUser($scope.formData);
      }

      // Extract the value and create an array of status codes
      if(response.status == 200) {
        console.log("Success: " + response.status + " - " + response.message);
        $location.path('/home');
      }else{
        console.log("Fail: " + response.status + " - " + response.message);
      }

    }



  }]);