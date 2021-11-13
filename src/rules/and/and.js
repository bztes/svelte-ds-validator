export const and = (...rules) => ({
  validate: (input) => {
    const success =
      rules
        .map((rule) => rule.validate(rule.value?.(input) ?? input))
        .find((success) => success !== true) || true;
    return success === true || success;
  },
});
