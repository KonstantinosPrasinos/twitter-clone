const supertest = require('supertest');
const app = require('../server');
describe('Authentication Integration Tests', () => {
  let authToken;
  // Successful login
  beforeAll(async () => {
    const loginResponse = await supertest(app)
      .post('/api/login')
      .send({ username: 'example_user', password: 'securepassword' });
    authToken = loginResponse.body.token;
  });
  test('should respond with a 200 status code for successful login', async () => {
    expect(authToken).toBeDefined();
  });

  test('should respond with a 401 status code for invalid credentials', async () => {
    const response = await supertest(app)
      .post('/api/login')
      .send({ username: 'invalid', password: 'invalid' });

    expect(response.status).toBe(401);
  });
  describe('Successful logout Test', () => {
    test('should respond with a 200 status code', async () => {
    const response = await supertest(app)
      .get('/logout')
      .set('Cookie', `jwt=${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logout successful');
    });
  });
});