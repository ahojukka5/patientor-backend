import patientService from '../src/services/patientService';

describe('patientService', () => {
  test('should return patients when calling getEntries', () => {
    const response = patientService.getEntries();
    expect(response[0].name).toBe('John McClane');
  });
});
