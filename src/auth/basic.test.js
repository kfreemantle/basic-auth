'use strict';

const supertest = require('supertest');
const app = require('../src/server');
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

test('Middleware returns an error with invalid credentials', async () => {
  const response = await request
    .post('/signin')
    .auth('invalidUser', 'invalidPassword');

  expect(response.status).toBe(403);
  expect(response.text).toBe('Invalid Login');
});

test('Middleware authenticates a user with valid credentials', async () => {
  const response = await request
    .post('/signin')
    .auth('testUser', 'testPassword');

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('username', 'testUser');
  // Other assertions...
});

