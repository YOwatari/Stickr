'use strict';

angular.module('stickrApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.phase = [ {
      'title': 'edit',
      'link': '/edit/put_sticker'
    } ];

    $scope.editPageCheck = function () {
      return $location.path().indexOf('edit') !== -1;
    };

    $scope.boldCheck = function (path) {
      return path === $location.path();
    };

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
