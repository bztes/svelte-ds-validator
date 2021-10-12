import { truthy } from '../../index';

let errorMsg = 'Invalid value';

describe('truthy', () => {
  test('undefined', () => {
    const validator = truthy();
    expect(validator.validate()).toBe(errorMsg);
  });

  test('null', () => {
    const validator = truthy();
    expect(validator.validate(null)).toBe(errorMsg);
  });

  test('true', () => {
    const validator = truthy();
    expect(validator.validate(true)).toBe(true);
  });

  test('false', () => {
    const validator = truthy();
    expect(validator.validate(false)).toBe(errorMsg);
  });

  test('0', () => {
    const validator = truthy();
    expect(validator.validate(0)).toBe(errorMsg);
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
