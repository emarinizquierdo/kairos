'use strict';

var app = require('../..');
import request from 'supertest';

describe('Light API:', function() {

  describe('GET /api/lights', function() {
    var lights;

    beforeEach(function(done) {
      request(app)
        .get('/api/lights')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          lights = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      lights.should.be.instanceOf(Array);
    });

  });

});
