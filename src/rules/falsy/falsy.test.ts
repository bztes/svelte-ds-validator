import { falsy } from './falsy';

describe('falsy', () => {
  test('undefined', () => {
    const validator = falsy();
    expect(validator.validate()).toBe(true);
  });

  test('null', () => {
    const validator = falsy();
    expect(validator.validate(null)).toBe(true);
  });

  test('true', () => {
    const validator = falsy();
    expect(validator.validate(true)).toBe(falsy.Options.msg.invalidValue);
  });

  test('false', () => {
    const validator = falsy();
    expect(validator.validate(false)).toBe(true);
  });

  test('0', () => {
    const validator = falsy();
    expect(validator.validate(0)).toBe(true);
  });

  test('1', () => {
    const validator = falsy();
    expect(validator.validate(1)).toBe(falsy.Options.msg.invalidValue);
  });

  test('string', () => {
    const validator = falsy();
    expect(validator.validate('a')).toBe(falsy.Options.msg.invalidValue);
  });
});
