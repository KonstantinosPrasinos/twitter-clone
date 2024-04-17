const supertest = require('supertest');
const app = require('../server');

describe('Post Integration Tests', () => {

    let authToken;
    // Successful login
    beforeAll(async () => {
        const loginResponse = await supertest(app)
        .post('/api/login')
        .send({ username: 'example_user', password: 'securepassword' });
        authToken = loginResponse.body.token;
    });
    
    test('should respond with a 200 status code for successful login', async () => {
        expect(loginResponse.status).toBe(200);
        expect(authToken).toBeDefined();
      });

    test('should respond with a 201 status code for successful post creation', async () => {
        const postResponse = await supertest(app)
        .post('/api/posts')
        .send({ postContent: 'This is a test post'});
        expect(postResponse.status).toBe(201);
    });

  test('should respond with a 400 status code for successful post creation', async () => {
    const postResponse = await supertest(app)
      .post('/api/posts')
      .send({ postContent: ''});
      expect(postResponse.status).toBe(400);
  });

});