import { regex } from '../../index';

let errorMsg = 'Invalid value';

describe('required', () => {
  test('valid string input', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate('abc123')).toBe(true);
  });
  test('valid number input', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate(789)).toBe(true);
  });
  test('invalid string pattern', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate('abC123')).toBe(errorMsg);
  });
  test('empty string', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate('')).toBe(errorMsg);
  });
  test('null', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate(null)).toBe(errorMsg);
  });
  test('undefined', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate(undefined)).toBe(errorMsg);
  });
});
