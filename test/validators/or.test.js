import { or, equals, not } from '../../index';

let errorMsg = 'Invalid value';

describe('or', () => {
  test('a = b or c', () => {
    let validator = or(equals('b'), equals('c'));
    expect(validator.validate('a')).toBe(errorMsg);
  });

  test('a = b or c or not(d)', () => {
    let validator = or(equals('b'), equals('c'), not(equals('d')));
    expect(validator.validate('a')).toBe(true);
  });

  test('true or false', () => {
    let validator = or(equals(true), equals(false));
    expect(validator.validate(false)).toBe(true);
  });
});
