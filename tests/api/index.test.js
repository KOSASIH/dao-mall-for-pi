const request = require('supertest');
const app = require('../index');

describe('API', () => {
  describe('GET /', () => {
    it('should return a welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal('Welcome to DAO Mall for Pi!');
    });
  });

  describe('GET /dao', () => {
    it$@$v=v1.16$@$('should return a list of DAOs', async () => {
      const res = await request(app).get('/dao');
      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  // Add more tests for other API endpoints
});
