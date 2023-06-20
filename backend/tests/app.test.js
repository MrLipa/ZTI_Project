const request = require('supertest');
const app = require('./../app');

describe('GET /', function() {
  it('Check if GET::http://localhost:3000 responds with "Hello, World!"', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello, World!', done);
  });
});