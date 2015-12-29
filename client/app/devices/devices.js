'use strict';

angular.module('kairosApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/devices', {
        templateUrl: 'app/devices/devices.html',
        controller: 'DevicesCtrl'
      });
  });
