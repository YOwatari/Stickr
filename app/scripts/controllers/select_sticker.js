'use strict';

angular.module('stickrApp')
  .controller('EditSeletctStickerCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
