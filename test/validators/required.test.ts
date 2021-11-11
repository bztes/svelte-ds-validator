import { required } from '../../index';

describe('required', () => {
  test('empty string', () => {
    let validator = required();
    expect(validator.validate('')).toBe(required.Options.msg.isRequired);
  });

  test('whitespaces', () => {
    let validator = required();
    expect(validator.validate(' \t')).toBe(required.Options.msg.isRequired);
  });

  test('undefined', () => {
    let validator = required();
    expect(validator.validate()).toBe(required.Options.msg.isRequired);
  });

  test('null', () => {
    let validator = required();
    expect(validator.validate(null)).toBe(required.Options.msg.isRequired);
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
