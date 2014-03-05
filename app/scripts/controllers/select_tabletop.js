'use strict';


angular.module('stickrApp')
  .controller('EditSeletctTabletopCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });

$("#photoIndex img").hover(
    function(){   // マウスオーバー
        $("#photoIndex img").fadeTo(0.1, 0.25);
        $(this).fadeTo(0.1, 1);
    },
    function(){   // マウスアウト
        $("#photoIndex img").fadeTo(0.1, 1);
    }
);