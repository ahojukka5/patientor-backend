import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('ping endpoint', () => {
  test('should return pong from ping', async () => {
    const response = await request.get('/api/ping');
    const expected = 'ping pong';
    expect(response.text).toEqual(expected);
  });
});
