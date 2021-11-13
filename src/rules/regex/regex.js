import _ from 'lodash';

export const regex = (pattern, options) => {
  options = _.defaultsDeep(options || {}, regex.Options);
  return {
    validate: function (value) {
      return !!value?.toString().match(pattern) || options.msg.invalidValue;
    },
  };
};

regex.Options = {
  msg: {
    invalidValue: 'Invalid value',
  },
};
