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

  test('should return one patient data', async () => {
    const uri = '/api/patients/d2773336-f723-11e9-8f0b-362b9e155667';
    const response = await request.get(uri);
    expect(response.body.name).toEqual('John McClane');
  });

  test('should return 400 if patient data not found', async () => {
    const uri = '/api/patients/notfound';
    const response = await request.get(uri);
    expect(response.status).toEqual(404);
  });

  test('should add new entry to existing patient', async () => {
    const uri = '/api/patients/d2773336-f723-11e9-8f0b-362b9e155667';
    const payload = {
      id: '12345',
      date: '2020-01-01',
      type: 'Hospital',
      specialist: 'MD House',
      diagnosisCodes: ['B00.0'],
      description: 'Born.',
      discharge: {
        date: '2020-01-2',
        criteria: 'Get away from hospital.',
      },
    };
    await request.post(`${uri}/entries`).send(payload);
    const response = await request.get(uri);
    const entries = response.body.entries;
    expect(entries[entries.length-1].description).toEqual('Born.');
  });

  test('should give 404 if adding entry to non-existing patient', async () => {
    const uri = '/api/patients/notfound';
    const response = await request.post(`${uri}/entries`).send({});
    expect(response.status).toEqual(404);
  });

});
