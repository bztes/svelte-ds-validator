import { Rule } from '../../checker';
import { not } from './not';

const echo: Rule = { validate: (v) => v };
const truthy: Rule = { validate: (v) => !!v || 'fail' };

describe('not', () => {
  test('not false', () => {
    let validator = not(echo);
    expect(validator.validate(false)).toBe(true);
  });

  test('not not false', () => {
    let validator = not(not(echo));
    expect(validator.validate(false)).toBe(not.Options.msg.invalidValue);
  });

  test('not(equals(true))', () => {
    let validator = not(truthy);
    expect(validator.validate(true)).toBe(not.Options.msg.invalidValue);
    expect(validator.validate(1)).toBe(not.Options.msg.invalidValue);
    expect(validator.validate(false)).toBe(true);
    expect(validator.validate(undefined)).toBe(true);
    expect(validator.validate(null)).toBe(true);
    expect(validator.validate(0)).toBe(true);
    expect(validator.validate('123abc')).toBe(not.Options.msg.invalidValue);
  });
});
