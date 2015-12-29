'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var deviceCtrlStub = {
  index: 'deviceCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var deviceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './device.controller': deviceCtrlStub
});

describe('Device API Router:', function() {

  it('should return an express router instance', function() {
    deviceIndex.should.equal(routerStub);
  });

  describe('GET /api/devices', function() {

    it('should route to device.controller.index', function() {
      routerStub.get
        .withArgs('/', 'deviceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
