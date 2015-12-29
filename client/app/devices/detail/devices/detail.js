'use strict';

angular.module('kairosApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/devices/detail/:id', {
        templateUrl: 'app/devices/detail/devices/detail.html',
        controller: 'DevicesDetailCtrl'
      });
  });
