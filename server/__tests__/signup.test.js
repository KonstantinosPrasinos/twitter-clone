const supertest = require('supertest');
const app = require('../server');

describe('Sign Up Integration Tests', () => {
  let authToken;
  beforeAll(async () => {
    const signupResponse = await supertest(app)
      .post('/signup')
      
      .send({ username: 'testUser', email: 'test@user.com', password: 'testPw' });
  });
  test('should respond with a 200 status code for successful sign up', async () => {
  });

  test('should respond with a 400 status code for signing up with existing email or username', async () => {
    const response = await supertest(app)
      .post('/signup')
      .send({ username: 'mario', email: 'marioskam3@gmail.com', password: 'Mario1!' });

    expect(response.status).toBe(400);
  });
});