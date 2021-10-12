import { and, email, equals, not, number, required } from '../../index';

let errorMsg = 'Invalid value';

describe('and', () => {
  test('true and false', () => {
    let validator = and(equals(true), equals(false));
    expect(validator.validate(0)).toBe(errorMsg);
  });

  test('true and true', () => {
    let validator = and(equals(true), equals(true));
    expect(validator.validate(true)).toBe(true);
  });

  test('empty', () => {
    let validator = and();
    expect(validator.validate()).toBe(true);
  });

  test('required and number', () => {
    let validator = and(required(), number());
    expect(validator.validate(23)).toBe(true);
  });

  test('(email and not(number)) and (required)', () => {
    let validator = and(and(email(), not(number())), required());
    expect(validator.validate('test@example.com')).toBe(true);
  });

  test('sub-rule value', () => {
    const validator = and(
      { ...equals('a'), value: (v) => v.a },
      { ...equals('b'), value: (v) => v.b },
    );
    expect(validator.validate({ a: 'a', b: 'b' })).toBe(true);
    expect(validator.validate({ a: 'c', b: 'b' })).toBe(errorMsg);
  });
});
