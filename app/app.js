'use strict';

var myApp = angular.module('myApp', [
  'firebase',
  'ngRoute',
  'myApp.family',
  'myApp.version'
]);

myApp.controller('home', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject) {

  var dbRef = firebase.database().ref();
  var storageRef = firebase.storage().ref();
  var urlPrefix = "gs://project-ec088.appspot.com/pets/"

  $scope.database = $firebaseArray(dbRef.child('family'))
  $scope.database.$loaded().then(function () {
    $scope.database.forEach(function (dog) {
      // console.log(dog)
      var ref = storageRef.child('pets/' + dog.picture)
      // console.log(ref)
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
  $scope.picturePath = ""

  var formCheck = function () {
    if ($scope.petName === "" || $scope.ownerName === "" ||
      $scope.address === "" || $scope.breed === "" ||
      $scope.bio === "" || $scope.contact === "") {
      alert("Invalid Form")
      return false
    }
    return true
  }

  $scope.addPicture = function (element) {
    console.log("23123")
    $scope.uploadPicture = element.files[0]
    // var fileReader = new FileReader()
    // console.log(file)
    // fileReader.onloadend = function (e) {
    //   console.log("here")
    //   var arrayBuffer = e.target.result;
    //   var fileType = "image/jpeg"
    //   console.log("asdsd")
    //   blobUtil.arrayBufferToBlob(arrayBuffer, fileType).then(function (blob) {
    //     $scope.uploadPicture = blob
    //     console.log(uploadPicture)
    //   }).catch(
    //     alert("Error Uploading Image")
    //     );
    // }
  }

  $scope.addToDB = function () {
    if (formCheck()) {
      var family = $firebaseArray(dbRef.child('family'))
      family.$add({
        address: $scope.address,
        bio: $scope.bio,
        breed: $scope.breed,
        contact: $scope.contact,
        name: $scope.petName,
        owner: $scope.ownerName
      }).then(function (result) {
        console.log(result.path.o[1])
        var imageRef = storageRef.child('pets/' + result.path.o[1])
        imageRef.put($scope.uploadPicture).then(function () {
          dbRef.child('family').child(result.path.o[1]).update({picture: result.path.o[1]})
        }).then(function () {
          $scope.petName = ""
          $scope.ownerName = ""
          $scope.address = ""
          $scope.breed = ""
          $scope.bio = ""
          $scope.contact = ""
          $scope.uploadPicture = null
          alert("Success! Picture upload might take some time!")
          $scope.$apply()
        })
      })
    }
  }
}]);

