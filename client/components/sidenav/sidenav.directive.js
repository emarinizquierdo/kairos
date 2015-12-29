'use strict';

angular.module('kairosApp').directive('sidenav', [function() {

    return {
        restrict: 'A',
        templateUrl: 'components/sidenav/sidenav.html',
        link: function($scope, $element, $attrs) {


            $element.find(".button-collapse").sideNav();

        }
    };

}]);