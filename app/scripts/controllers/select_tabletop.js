'use strict';

angular.module('stickrApp')
	.controller('EditSeletctTabletopCtrl', function ($scope, $http) {
		$http.get('/api/awesomeThings').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
			});
	});
});
// angular.module('stickrApp')
//   .directive("tabletop", function () {
//     return function (scope, element, attr) {
//         element.bind('mouseover', function (event) {
//         	console.log("over");
// 			//$("#tabletop img").fadeTo(0.1, 0.25);
// 			//$(this).fadeTo(0.1, 1);
//         });
//         element.bind('mouseout', function (event) {
//         	//$(this).fadeTo(0.1, 1);
//         	console.log("out");
//         });
//     }
// });