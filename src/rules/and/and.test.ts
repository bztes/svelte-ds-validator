import { Rule } from '../../checker';
import { and } from './and';

const echo: Rule = { validate: (v) => v };
const truthy: Rule = { validate: (v) => !!v || 'fail' };

describe('and', () => {
  test('true and false', () => {
    let validator = and(truthy, echo);
    expect(validator.validate("fail")).toBe("fail");
  });

  test('empty', () => {
    let validator = and();
    expect(validator.validate()).toBe(true);
  });

  test('true and true', () => {
    let validator = and(echo, echo);
    expect(validator.validate(true)).toBe(true);
  });

  test('(true and true) and true', () => {
    let validator = and(and(echo, echo), echo);
    expect(validator.validate(true)).toBe(true);
  });

  test('sub-rule value', () => {
    const validator = and(
      { ...echo, value: (v) => v.e },
      { ...truthy, value: (v) => v.b },
    );
    expect(validator.validate({ e: true, b: 'bla' })).toBe(true);
    expect(validator.validate({ e: 'fail', b: true })).toBe('fail');
  });
});
