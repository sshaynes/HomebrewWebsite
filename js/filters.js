'use strict';

/* Filters */

angular.module('brewApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);

// Create a new filter that shows the unfinished tasks
// And shows the finished tasks when the flag is ON
angular.module('brewApp.filters', []).
  filter('checkedItems', function()
  {
    return function(items, showComplete) {
      var resultArr = [];
      angular.forEach(items, function(item) {
        if(item.done == false || showComplete == true) {
          resultArr.push(item);
        }
      });
      return resultArr;
    }
  });
