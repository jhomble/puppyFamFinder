'use strict';

var myApp = angular.module('myApp', [
  'firebase',
  'ngRoute',
  'myApp.family',
  'myApp.version'
]);

myApp.controller('home', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {

  var dbRef = firebase.database().ref();
  var storageRef = firebase.storage().ref();
  var urlPrefix = "gs://project-ec088.appspot.com/pets/"

  $scope.database = $firebaseArray(dbRef.child('family'))
  $scope.database.$loaded().then(function () {
    $scope.database.forEach(function(dog) {
      console.log(dog)
      var ref = storageRef.child('pets/' + dog.picture)
      console.log(ref)
      ref.getDownloadURL().then(function(url){
        dog.image = url
        $scope.$apply()
      })
    });
  })


  $scope.addToDB = function () {
    var family = $firebaseArray(dbRef.child('family'))
    family.$add({
      name: 'fudge'
    })
  }
}]);

