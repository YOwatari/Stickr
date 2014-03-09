'use strict';

angular.module('stickrApp')
  .controller('TutorialCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function (awesomeThings) {
        $scope.awesomeThings = awesomeThings;

        $scope.imgTutorials = [
          {
            'src': 'images/tutorials/step01.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step02.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step03.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step04.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step05.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step06.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step07.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step08.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step09.png',
            'width': 1024,
            'height': 576
          },
          {
            'src': 'images/tutorials/step10.png',
            'width': 1024,
            'height': 576
          }
        ];
        $scope.nextTutorial = function (index) {
          console.log("next tutorial"+index);
          if(index<10){
            window.scrollBy( 0, screen.height/10*(index+1));
          }
        };
        $scope.$emit('success');
    });
  });