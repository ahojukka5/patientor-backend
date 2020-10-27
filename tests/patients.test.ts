import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('patients endpoint', () => {
  test('should return patients', async () => {
    const response = await request.get('/api/patients');
    expect(response.body[0].name).toEqual('John McClane');
  });
});
