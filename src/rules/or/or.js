import { validateRule } from '../../checker';

export const or = (...rules) => ({
  validate: (input) => {
    if (rules.length === 0) {
      return true;
    }

    const errMsg = rules
      .map((rule) => validateRule(rule, input))
      .find((success) => success === true);

    return errMsg === true || validateRule(rules[0], input);
  },
});
