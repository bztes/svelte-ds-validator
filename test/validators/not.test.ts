import { equals, number, not } from '../../index';

let errorMsg = 'Invalid value';

describe('not', () => {
  test('true.equals(false)', () => {
    let validator = not(equals(false));
    expect(validator.validate(true)).toBe(true);
  });

  test('not(equals(true))', () => {
    let validator = not(equals(true));
    expect(validator.validate(true)).toBe(errorMsg);
    expect(validator.validate(1)).toBe(errorMsg);
    expect(validator.validate(false)).toBe(true);
    expect(validator.validate(undefined)).toBe(true);
    expect(validator.validate(null)).toBe(true);
    expect(validator.validate(0)).toBe(true);
    expect(validator.validate('123abc')).toBe(true);
  });

  test('number range', () => {
    let validator = not(number({ min: 1, max: 9 }));
    expect(validator.validate(1)).toBe(errorMsg);
    expect(validator.validate(9)).toBe(errorMsg);
    expect(validator.validate(0)).toBe(true);
    expect(validator.validate(10)).toBe(true);
  });
});
