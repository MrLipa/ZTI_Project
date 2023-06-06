const request = require('supertest');
const app = require('./../app');

describe('GET /', function() {
  it('responds with "Hello, World!"', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello, Worldt!', done);
  });
});