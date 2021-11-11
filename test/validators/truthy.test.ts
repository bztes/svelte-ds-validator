import { truthy } from '../../index';

describe('truthy', () => {
  test('undefined', () => {
    const validator = truthy();
    expect(validator.validate()).toBe(truthy.Options.msg.invalidValue);
  });

  test('null', () => {
    const validator = truthy();
    expect(validator.validate(null)).toBe(truthy.Options.msg.invalidValue);
  });

  test('true', () => {
    const validator = truthy();
    expect(validator.validate(true)).toBe(true);
  });

  test('false', () => {
    const validator = truthy();
    expect(validator.validate(false)).toBe(truthy.Options.msg.invalidValue);
  });

  test('0', () => {
    const validator = truthy();
    expect(validator.validate(0)).toBe(truthy.Options.msg.invalidValue);
  });

  test('1', () => {
    const validator = truthy();
    expect(validator.validate(1)).toBe(true);
  });

  test('string', () => {
    const validator = truthy();
    expect(validator.validate('a')).toBe(true);
  });
});
