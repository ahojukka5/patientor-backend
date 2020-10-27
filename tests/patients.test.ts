import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('patients endpoint', () => {
  test('should return patients', async () => {
    const response = await request.get('/api/patients');
    expect(response.body[0].name).toEqual('John McClane');
  });
  test('should add new patient', async () => {
    const payload = {
      name: 'John Doe',
      dateOfBirth: '2000-01-01',
      ssn: '1234',
      gender: 'male',
      occupation: 'engineer',
    };
    const response = await request.post('/api/patients').send(payload);
    expect(response.body.name).toEqual('John Doe');
  });
});
