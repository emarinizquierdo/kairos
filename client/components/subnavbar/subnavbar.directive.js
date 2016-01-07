'use strict';

angular.module('kairosApp')
  .directive('subnavbar', function () {
    return {
      templateUrl: 'components/subnavbar/subnavbar.html',
      restrict: 'EA',
      scope : {
      	'name' : "="
      },
      link: function (scope, element, attrs) {
      }
    };
  });
