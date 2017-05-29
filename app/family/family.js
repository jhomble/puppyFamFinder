'use strict';

angular.module('myApp.family', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/family', {
      templateUrl: 'family/family.html',
      // controller: 'familyCtrl'
    });
  }])

  // .controller('familyCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
  //   $scope.asd = "asdasdas"
  //   console.log("here")


  // }]);