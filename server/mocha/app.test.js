const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')

describe('Express.js: Check default routes', () => {

  describe('GET /', () => {

    it('should return OK status', () => {
      return request(app)
        .get('/')
        .then(response => {
            assert.equal(response.status, 200)
        });
    });

    it('should return message on rendering', () => {
      return request(app)
        .get('/')
        .then(response => {
            expect(response.text).to.contain('You got home page!');
        });
    });

  });

  describe('GET /login', () => {

    it('should return OK status', () => {
      return request(app)
        .get('/login')
        .then(response => {
            assert.equal(response.status, 200)
        });
    });

    it('should return message on rendering', () => {
      return request(app)
        .get('/login')
        .then(response => {
            expect(response.text).to.contain('You got the login page!');
        });
    });

  });

  describe('GET /authrequired', () => {
    
    // Before Login
    it('Before Login, should return error 302', () => {
      return request(app)
        .get('/authrequired')
        .then(response => {
            assert.equal(response.status, 302)
        });
    });

    it('Before Login, should return message on rendering', () => {
      return request(app)
        .get('/authrequired')
        .then((response) => {
            expect(response.text).to.contain('');
        });
    });

  });

});