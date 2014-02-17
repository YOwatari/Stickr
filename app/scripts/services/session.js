'use strict';

angular.module('stickrApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
