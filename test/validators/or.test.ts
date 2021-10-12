import { or, equals, not, number, required } from '../../index';

let errorMsg = 'Invalid value';
let errorMsgNaN = 'Not a number';

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
    expect(validator.validate(true)).toBe(true);
    expect(validator.validate(false)).toBe(true);
  });

  test('optional number', () => {
    let validator = or(number(), not(required()));
    expect(validator.validate(123)).toBe(true);
    expect(validator.validate()).toBe(true);
    expect(validator.validate(' ')).toBe(true);
    expect(validator.validate('abc')).toBe(errorMsgNaN);
  });

  test('sub-rule value', () => {
    const validator = or(
      { ...equals('a'), value: (v) => v.a },
      { ...equals('b'), value: (v) => v.b },
    );
    expect(validator.validate({ a: 'a', b: 'b' })).toBe(true);
    expect(validator.validate({ a: 'y', b: 'z' })).toBe(errorMsg);
  });
});
