'use strict';

angular.module('kairosApp')
  .factory('Light', function($rootScope, $resource) {

    var _Light = {};

    _Light.data = [];

    _Light.resource = $resource('/api/lights/:id', {
        id: '@_id'
    }, {
        get: {
            method: 'GET',
            isArray: false
        }
    });

    return _Light;

});