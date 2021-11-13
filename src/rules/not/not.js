import _ from 'lodash';

export const not = (rule, options) => {
  options = _.defaultsDeep(options || {}, not.Options);
  return {
    ...rule,
    validate: function (value) {
      return rule.validate(value) !== true ? true : options.msg.invalidValue;
    },
  };
};

not.Options = {
  msg: {
    invalidValue: 'Invalid value',
  },
};
