import { required } from '../../index';

let errorMsg = 'This field is required';

describe('required', () => {
  test('empty string', () => {
    let validator = required();
    expect(validator.validate('')).toBe(errorMsg);
  });

  test('whitespaces', () => {
    let validator = required();
    expect(validator.validate(' \t')).toBe(errorMsg);
  });

  test('undefined', () => {
    let validator = required();
    expect(validator.validate()).toBe(errorMsg);
  });

  test('null', () => {
    let validator = required();
    expect(validator.validate(null)).toBe(errorMsg);
  });

  test('function', () => {
    let validator = required();
    expect(validator.validate(() => 'sada')).toBe(true);
  });

  test('number 0', () => {
    let validator = required();
    expect(validator.validate(0)).toBe(true);
  });

  test('number 1', () => {
    let validator = required();
    expect(validator.validate(1)).toBe(true);
  });

  test('true', () => {
    let validator = required();
    expect(validator.validate(true)).toBe(true);
  });

  test('false', () => {
    let validator = required();
    expect(validator.validate(false)).toBe(true);
  });

  test('string', () => {
    let validator = required();
    expect(validator.validate('a123')).toBe(true);
  });

  test('string trim=false', () => {
    let validator = required({ trim: false });
    expect(validator.validate('\t ')).toBe(true);
  });

  test('false trim=false', () => {
    let validator = required({ trim: false });
    expect(validator.validate(false)).toBe(true);
  });
});
