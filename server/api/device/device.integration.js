'use strict';

var app = require('../..');
import request from 'supertest';

describe('Device API:', function() {

  describe('GET /api/devices', function() {
    var devices;

    beforeEach(function(done) {
      request(app)
        .get('/api/devices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          devices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      devices.should.be.instanceOf(Array);
    });

  });

});
