'use strict';

const supertest = require('supertest');
const app = require('../src/server.js');
const sequelize = require('../src/config/database');
const { User } = require('../src/auth/models/users-model');

const request = supertest(app);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await User.create({ username: 'testUser', password: 'testPassword' });
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

test('POST /signup creates a new user', async () => {
  const response = await request
    .post('/signup')
    .send({ 
      username: 'kyleTest', 
      password: 'testKylePassword',
  });

  expect(response.status).toBe(200)
  expect(response.body.username).toEqual('kyleTest');
  
});

test('POST /signin logs in a user', async () => {
  const response = await request
    .post('/signin')
    .auth('testKyle', 'testKylePassword');

  expect(response.status).toBe(200);
  
});
