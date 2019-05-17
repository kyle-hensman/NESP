const request = require('supertest');
const app = require('./app');

describe('Check API endpoints', () => {
  describe('GET /', () => {
    it('should return status 200', () => {
      return request(app).get('/').expect(200);
    });
  });
  
  describe('GET /login', () => {
    it('should return status 200', () => {
      return request(app).get('/login').expect(200);
    });
  });

  describe('POST /login', () => {
    it('should respond with json', () => {
      return request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .expect(200);
    });
  });

  describe('GET /authrequired', () => {
    it('should return status 302', () => {
      return request(app).get('/authrequired').expect(302);
    });
  });
});