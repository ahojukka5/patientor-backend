import { toNewPatient } from '../src/utils';

describe('toNewPatient', () => {
  test('throws if name is missing or incorrect', () => {
    expect(() => {
      toNewPatient({});
    }).toThrow(Error);
    expect(() => {
      toNewPatient({ name: 1234 });
    }).toThrow(Error);
  });

  test('throws if DateOfBirth is missing', () => {
    expect(() => {
      toNewPatient({ name: 'John Doe' });
    }).toThrow(Error);
  });

  test('throws if ssn is missing', () => {
    expect(() => {
      toNewPatient({ name: 'John Doe', dateOfBirth: '2000-01-01' });
    }).toThrow(Error);
  });

  test('throws if gender is missing', () => {
    expect(() => {
      toNewPatient({
        name: 'John Doe',
        dateOfBirth: '2000-01-01',
        ssn: '1234',
      });
    }).toThrow(Error);
  });

  test('throws if occupation is missing', () => {
    expect(() => {
      toNewPatient({
        name: 'John Doe',
        dateOfBirth: '2000-01-01',
        ssn: '1234',
        gender: 'male',
      });
    }).toThrow(Error);
  });

  test('throws if entries is missing', () => {
    expect(() => {
      toNewPatient({
        name: 'John Doe',
        dateOfBirth: '2000-01-01',
        ssn: '1234',
        gender: 'male',
        occupation: 'none',
      });
    }).toThrow(Error);
  });

  test('throws if incorrect entry', () => {
    expect(() => {
      toNewPatient({
        name: 'John Doe',
        dateOfBirth: '2000-01-01',
        ssn: '1234',
        gender: 'male',
        occupation: 'none',
        entries: [
          {
            type: 'unknown',
          },
        ],
      });
    }).toThrow(Error);
  });
});
