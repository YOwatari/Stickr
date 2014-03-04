'use strict';

angular.module('stickrApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.phase = [{
      'title': 'Select Tabletop',
      'link': '/edit/select_tabletop'
    }, {
      'title': 'Select Sticker',
      'link': '/edit/select_sticker'
    }, {
      'title': 'Put Sticker',
      'link': '/edit/put_sticker'
    }, {
      'title': 'Complete Tabletop',
      'link': '/edit/submit'
    }];

    $scope.page = [{
      'title': 'home',
      'link': '/'
    }];

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
