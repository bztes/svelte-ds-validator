import _ from 'lodash';

export const equals = (value, options) => {
  options = _.defaultsDeep(options || {}, equals.Options);
  return {
    validate: function (input) {
      return value == input || options.msg.invalidValue;
    },
  };
};

equals.Options = {
  msg: {
    invalidValue: 'Invalid value',
  },
};
