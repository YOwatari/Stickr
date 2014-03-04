'use strict';

angular.module('stickrApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/edit/select_tabletop', {
        templateUrl: 'partials/select_tabletop',
        controller: 'EditSeletctTabletopCtrl'
      })
      .when('/edit/select_sticker', {
        templateUrl: 'partials/select_sticker',
        controller: 'EditSeletctStickerCtrl'
      })
      .when('/edit/put_sticker', {
        templateUrl: 'partials/put_sticker',
        controller: 'EditPutStickerCtrl'
      })
      .when('/edit/submit', {
        templateUrl: 'partials/submit',
        controller: 'EditSubmitCtrl'
      })
      .when('/tabletop', {
        templateUrl: 'partials/tabletop',
        controller: 'TabletopCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });