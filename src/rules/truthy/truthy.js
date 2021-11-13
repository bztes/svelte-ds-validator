import _ from 'lodash';

export const truthy = (options) => {
  options = _.defaultsDeep(options || {}, truthy.Options);
  return {
    validate: (input) => Boolean(input) || 'Invalid value',
  };
};
truthy.Options = {
  msg: {
    invalidValue: 'Invalid value',
  },
};
