import { equals } from './equals';

describe('equals', () => {
  test('true vs. 0', () => {
    let validator = equals(true);
    expect(validator.validate(0)).toBe(equals.Options.msg.invalidValue);
  });

  test('null vs. undefined', () => {
    let validator = equals(null);
    expect(validator.validate()).toBe(true);
  });

  test('true vs. 1', () => {
    let validator = equals(true);
    expect(validator.validate(1)).toBe(true);
  });

  test('undefined', () => {
    let validator = equals();
    expect(validator.validate()).toBe(true);
  });

  test('empty string', () => {
    let validator = equals('');
    expect(validator.validate('')).toBe(true);
  });

  test('null', () => {
    let validator = equals(null);
    expect(validator.validate(null)).toBe(true);
  });

  test('function', () => {
    let fct = () => '';
    let validator = equals(fct);
    expect(validator.validate(fct)).toBe(true);
  });

  test('string', () => {
    let validator = equals('a123');
    expect(validator.validate('a123')).toBe(true);
  });
});
