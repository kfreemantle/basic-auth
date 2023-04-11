'use strict';

const supertest = require('supertest');
const app = require('../src/server');

const request = supertest(app);

test('GET non-existent route returns 404 with a custom error message', async () => {
  const response = await request.get('/non-existent-route');

  expect(response.status).toBe(404);
  expect(response.text).toBe('Resource not found');
});
