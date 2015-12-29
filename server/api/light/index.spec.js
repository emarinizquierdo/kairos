'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var lightCtrlStub = {
  index: 'lightCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var lightIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './light.controller': lightCtrlStub
});

describe('Light API Router:', function() {

  it('should return an express router instance', function() {
    lightIndex.should.equal(routerStub);
  });

  describe('GET /api/lights', function() {

    it('should route to light.controller.index', function() {
      routerStub.get
        .withArgs('/', 'lightCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
