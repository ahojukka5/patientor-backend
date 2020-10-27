import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('diagnoses endpoint', () => {
  test('should return diagnoses', async () => {
    const response = await request.get('/api/diagnoses');
    expect(response.body[0].code).toEqual('M24.2');
  });
});
