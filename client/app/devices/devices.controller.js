'use strict';

angular.module('kairosApp').controller('DevicesCtrl', ["$scope", "$location", "Device", function($scope, $location, Device) {

    $scope.Device = Device;
    $scope.newDevice;

    var toDelete = null;

    var collapsible = $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $scope.addNew = function(newDevice) {

        Device.resource.save(newDevice, function(data) {
            Device.data.push(data);
        }, function() {

        });

        $scope.newDevice = {};
        collapsible.find(".collapsible-header").click();
    }

    $scope.goToDetail = function(id) {
        $location.path("devices/detail/" + id);
    }

    $scope.beforeToDelete = function(device) {
        toDelete = device;
        $('#modal1').openModal();

    }

    $scope.deleteDevice = function() {
        $('#modal1').closeModal();
        Device.resource.delete({id : toDelete._id}, function(data) {
            localDelete(Device.data, toDelete);
        }, function(e) {

        })
    }

    function localDelete(array, data) {
        angular.forEach(array, function(item, index) {
            if (item._id === data._id) {
                array.splice(index, 1);
                return false;
            }
        });
    }

}]);