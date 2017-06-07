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
    $scope.database.forEach(function (dog) {
      console.log(dog)
      var ref = storageRef.child('pets/' + dog.picture)
      console.log(ref)
      ref.getDownloadURL().then(function (url) {
        dog.image = url
        $scope.$apply()
      })
    });
  })

  $scope.petName = ""
  $scope.ownerName = ""
  $scope.address = ""
  $scope.breed = ""
  $scope.bio = ""
  $scope.contact = ""

  var formCheck = function () {
    if ($scope.petName.length() == 0 || $scope.ownerName.length() == 0 ||
      $scope.address.length() == 0 || $scope.breed.length() == 0 ||
      $scope.bio.length() == 0 || $scope.contact.length() == 0) {
      console.log("error")
      return false
    }
    return true
  }

  $scope.addToDB = function () {
    
    if(formCheck){
      
      var family = $firebaseArray(dbRef.child('family'))
      family.$add({
        address: $scope.address,
        bio: $scope.bio,
        breed: $scope.breed,
        contact: $scope.contact,
        name: $scope.petName,
        owner: $scope.ownerName
      }).then(function(){
        console.log("done")
        $scope.petName = ""
        $scope.ownerName = ""
        $scope.address = ""
        $scope.breed = ""
        $scope.bio = ""
        $scope.contact = ""
        $scope.$apply()
      })
    }
  }
}]);

