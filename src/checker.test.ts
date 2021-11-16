import { get } from 'svelte/store';
import { createChecker, equals, number, required, truthy } from './index';

describe('checker', () => {
  test('custom error message', () => {
    let checker = createChecker({
      fields: {
        a: {
          value: () => '',
          rule: { ...required(), error: '"a" is required' },
        },
      },
    });

    expect(checker.validate()).toBe(false);
    expect(get(checker).fields.a.error).toBe('"a" is required');
  });

  test('custom rule value', () => {
    let checker = createChecker({
      fields: {
        a: {
          value: () => ({ response: 'Succeed', error: null }),
          rule: { ...truthy(), value: (v) => v.response },
        },
      },
    });

    expect(checker.validate()).toBe(true);
    expect(get(checker).fields.a.valid).toBe(true);
  });

  test('default rule', () => {
    let checker = createChecker({
      fields: {
        a: { value: () => '' },
      },
    });

    expect(checker.validate()).toBe(false);
    expect(get(checker).fields.a.error).toBe('This field is required');
  });

  test('custom default rule', () => {
    let checker = createChecker({
      defaultRule: number(),
      fields: {
        a: { value: () => 'a123' },
      },
    });

    expect(checker.validate()).toBe(false);
    expect(get(checker).fields.a.error).toBe('Not a number');
  });

  test('validate with input', () => {
    let checker = createChecker({
      fields: {
        a: {
          value: (d) => d.a,
          rule: equals('abc'),
        },
      },
    });

    expect(checker.validate({ a: 'abc' })).toBe(true);
    expect(get(checker).fields.a.valid).toBe(true);
  });
});
