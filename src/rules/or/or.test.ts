import { Rule } from '../../checker';
import { or } from './or';

const echo: Rule = { validate: (v) => v };
const truthy: Rule = { validate: (v) => !!v || 'fail' };
const falsy: Rule = { validate: (v) => !v || 'fail' };
const b: Rule = { validate: (v) => 'b' === v || 'fail b' };
const c: Rule = { validate: (v) => 'c' === v || 'fail c' };

describe('or', () => {
  test('a = b or c', () => {
    let validator = or(b, c);
    expect(validator.validate('a')).toBe('fail b');
  });

  test('true or false', () => {
    let validator = or(truthy, falsy);
    expect(validator.validate(true)).toBe(true);
    expect(validator.validate(false)).toBe(true);
  });

  test('sub-rule value', () => {
    const validator = or(
      { ...echo, value: (v) => v.e },
      { ...truthy, value: (v) => v.t },
      { ...b, value: (v) => v.b },
    );
    expect(validator.validate({ e: 'fail', t: false, b: 'b' })).toBe(true);
    expect(validator.validate({ e: 'fail', t: false, b: 'z' })).toBe('fail');
  });
});
