import _ from 'lodash';

export const falsy = (options) => {
  options = _.defaultsDeep(options || {}, falsy.Options);
  return {
    validate: (input) => !input || options.msg.invalidValue,
  };
};

falsy.Options = {
  msg: {
    invalidValue: 'Invalid value',
  },
};
