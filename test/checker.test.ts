import { get } from 'svelte/store';
import { createChecker, number, required } from '../index';

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
});
