const supertest = require('supertest');
const app = require('../server');

let authToken;
// Successful login
beforeAll(async () => {
  const loginResponse = await supertest(app)
  .post('/api/login')
  .send({ username: 'example_user', password: 'securepassword' });
  authToken = loginResponse.body.token;
});

describe('Create Post Integration Tests', () => {

    test('should respond with a 201 status code for successful post creation', async () => {
        const postResponse = await supertest(app)
        .post('/api/posts')
        .set('Cookie', `jwt=${authToken}`)
        .send({ postContent: 'This is a test post'});
        expect(postResponse.status).toBe(201);
    });

  test('should respond with a 400 status code for failed post creation (No PostContent)', async () => {
    const postResponse = await supertest(app)
      .post('/api/posts')
      .send({ postContent: ''})
      .set('Cookie', `jwt=${authToken}`);
      expect(postResponse.status).toBe(400);
  });

});

describe('Like Post Integration Tests', () => {

  test('should respond with a 201 status code for successful like in a post', async () => {
      const postResponse = await supertest(app)
      .post('/api/post/like')
      .set('Cookie', `jwt=${authToken}`)
      .send({ user_id: 2, post_id:  30});
      expect(postResponse.status).toBe(201);
  });

test('should respond with a 404 status code for liking a non existing post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/like')
    .send({ user_id: 2, post_id:  1000})
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(404);
});

test('should respond with a 400 status code for liking an already liked post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/like')
    .send({ user_id: 2, post_id:  1})
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(400);
});

});

describe('UnLike Post Integration Tests', () => {

  test('should respond with a 201 status code for successful like  a post', async () => {
      const postResponse = await supertest(app)
      .post('/api/post/unlike/30')
      .set('Cookie', `jwt=${authToken}`)
      expect(postResponse.status).toBe(201);
  });

test('should respond with a 404 status code for unliking a non existing post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/unlike/1000')
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(404);
});

test('should respond with a 400 status code for liking an already liked post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/like/30')
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(400);
});

});

describe('Repost Post Integration Tests', () => {

  test('should respond with a 201 status code for successful repost a post', async () => {
      const postResponse = await supertest(app)
      .post('/api/post/repost')
      .set('Cookie', `jwt=${authToken}`)
      .send({ user_id: 2, post_id:  10});
      expect(postResponse.status).toBe(201);
  });

test('should respond with a 404 status code for reposting a non existing post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/repost')
    .send({ user_id: 2, post_id:  1000})
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(404);
});

test('should respond with a 400 status code for reposting an already reposted post post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/repost')
    .send({ user_id: 2, post_id:  11})
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(400);
});

});

describe('Unrepost Post Integration Tests', () => {

  test('should respond with a 201 status code for successful unreposting a post', async () => {
      const postResponse = await supertest(app)
      .post('/api/post/unrepost/10')
      .set('Cookie', `jwt=${authToken}`)
      expect(postResponse.status).toBe(201);
  });

test('should respond with a 404 status code for unreposting a non existing post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/urepost/1000')
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(404);
});

test('should respond with a 400 status code for unreposting an already unreposted  post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/unrepost/30')
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(400);
});

});

describe('Reply Post Integration Tests', () => {

  test('should respond with a 201 status code for successful reply a post', async () => {
      const postResponse = await supertest(app)
      .post('/api/post/reply')
      .set('Cookie', `jwt=${authToken}`)
      .send({ user_id: 2, post_id: 39, content: "This is a test reply"})
      expect(postResponse.status).toBe(201);
  });

test('should respond with a 404 status code for replying to a non existing post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/repost')
    .send({ user_id: 2, post_id: 10000, content: "This is a test reply"})
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(404);
});

test('should respond with a 400 status code for reposting an already replied the post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/repost')
    .send({ user_id: null, post_id: null, content: "This is a test reply"})
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(400);
});

});

describe('UnReply Post Integration Tests', () => {

  test('should respond with a 201 status code for successful unreplying a post', async () => {
      const postResponse = await supertest(app)
      .post('/api/post/unreply/2')
      .set('Cookie', `jwt=${authToken}`)
      expect(postResponse.status).toBe(201);
  });

test('should respond with a 404 status code for unreplying a non existing post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/unreply/1000')
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(404);
});

test('should respond with a 400 status code for unreplying an already unreplyied  post ', async () => {
  const postResponse = await supertest(app)
    .delete('/api/post/unreply/2')
    .set('Cookie', `jwt=${authToken}`);
    expect(postResponse.status).toBe(400);
});

});


