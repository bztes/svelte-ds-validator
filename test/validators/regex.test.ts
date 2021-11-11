import { regex } from '../../index';

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
    expect(validator.validate('abC123')).toBe(regex.Options.msg.invalidValue);
  });
  test('empty string', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate('')).toBe(regex.Options.msg.invalidValue);
  });
  test('null', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate(null)).toBe(regex.Options.msg.invalidValue);
  });
  test('undefined', () => {
    let validator = regex(/^[a-z0-9]+$/);
    expect(validator.validate(undefined)).toBe(regex.Options.msg.invalidValue);
  });
});
