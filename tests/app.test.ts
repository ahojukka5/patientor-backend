import app from '../app';
import request from 'supertest';

describe('ping endpoint', () => {
  test('should return pong form ping', async () => {
    const response = await request(app).get('/ping');
    const expected = 'pong';
    expect(response.text).toEqual(expected);
  });
});
