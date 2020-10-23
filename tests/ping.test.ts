import express from 'express';
import pingRouter from '../src/controllers/ping';
import supertest from 'supertest';

const app = express();
app.use(pingRouter);
const request = supertest(app);

describe('ping endpoint', () => {
  test('should return pong form ping', async () => {
    const response = await request.get('/');
    const expected = 'pong';
    expect(response.text).toEqual(expected);
  });
});
