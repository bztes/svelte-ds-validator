import { validateRule } from '../../checker';

export const and = (...rules) => ({
  validate: (input) => {
    const errMsg = rules
      .map((rule) => validateRule(rule, input))
      .find((success) => success !== true);
    const validationResult = errMsg || true;
    return validationResult === true || validationResult;
  },
});
