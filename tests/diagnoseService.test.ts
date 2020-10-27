import diagnoseService from '../src/services/diagnoseService';

describe('diagnoseService', () => {
  test('should return undefined when calling addEntry', () => {
    const response = diagnoseService.addEntry();
    expect(response).toBeNull();
  });
});
