'use strict';


$(window).on('touchmove.noScroll', function(e) {
    e.preventDefault();
});

angular.module('stickrApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });