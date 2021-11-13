import _ from 'lodash';

export const or = (...rules) => ({
  validate: function (input) {
    return (
      rules.length == 0 ||
      !!rules
        .map((rule) => rule.validate(rule.value?.(input) ?? input))
        .find((success) => success === true) ||
      rules[0].validate(rules[0].value?.(input) ?? input)
    );
  },
});
