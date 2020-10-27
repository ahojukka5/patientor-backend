import toNewPatient from '../src/utils';

describe('toNewPatient', () => {
  test('throws if name is missing', () => {
    expect(() => {
      toNewPatient({});
    }).toThrow(Error);
  });
});
