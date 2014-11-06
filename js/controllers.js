'use strict';

/* Controllers */

angular.module('brewApp.controllers', [])
  .controller('home', ['$scope', '$http', '$log', 'githubService', 'userRepository',
  function($scope, $http, $log, githubService, userRepository)
  {
    $scope.arrApiResponses = userRepository.getAllUsers();
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

    $scope.userRegister = function(formData)
    {
      var errorsArr = [];
      var response = {};

      if (!formData.username) {
        errorsArr.push('Username is Required!');
      }

      if (!formData.email) {
        errorsArr.push('Email is Required!');
      }

      if (!formData.password) {
        errorsArr.push('Password is Required!');
      }

      if (!formData.confirmPassword) {
        errorsArr.push('Password Confirmation is Required!');
      }

      if(formData.password !== $scope.formData.confirmPassword) {
        errorsArr.push('Passwords do NOT match!');
      }

      $scope.formErrors = errorsArr;

      // No errors, register user
      if(errorsArr.length == 0)
      {
        userRepository.registerNewUser($scope.formData).then(function(httpRes)
        {
          // Returns an HTTP Response object
          // Extract response data
          var response = httpRes.data;

          // Extract the value and create an array of status codes
          if(response.status == 200) {
            console.log("Success: " + response.status + " - " + response.message);
            $location.path('/profile');
          }else{
            console.log("Fail: " + response.status + " - " + response.message);
            // Figure out a way to display error message when this fails
            errorsArr.push('Error!');

          }
        },function(httpRes){
          console.log("Unknown server error: " + httpRes.status + "\n" + httpRes.data);
        });
      }

    }



    $scope.userLogin = function(formData)
    {
      var errorsArr = [];
      var response = {};
      // $scope.formErrors = [];

      // if (!$scope.formData.email) {
      //   errorsArr.push('Email is Required!');
      // }

      if (!formData.username) {
        errorsArr.push('Username is Required!');
      }

      if (!formData.password) {
        errorsArr.push('Password is Required!');
      }

      $scope.formErrors = errorsArr;

      // No errors, register user
      if(errorsArr.length == 0)
      {
        userRepository.loginUser($scope.formData).then(function(httpRes)
        {
          // Returns an HTTP Response object
          // Extract response data
          response = httpRes.data;

          // Extract the value and create an array of status codes
          if(response.status == 200) {
            console.log("Success: " + response.status + " - " + response.message);
            $location.path('/profile');
          }else{
            console.log("Fail: " + response.status + " - " + response.message);
            // Figure out a way to display error message when this fails
            errorsArr.push('Invalid Username or Password. Please try again!');
            // console.log(errorsArr);
          }
        },function(httpRes){
          console.log("Unknown server error: " + httpRes.status + "\n" + httpRes.data);
        });
      }
    }

  }]);