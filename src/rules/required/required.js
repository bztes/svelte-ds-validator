import _ from 'lodash';

export const required = (options) => {
  options = _.defaultsDeep(options || {}, required.Options);
  return {
    validate: function (input) {
      return (
        (input !== undefined &&
          input !== null &&
          ((!options.trim && input.toString().length > 0) ||
            (options.trim && !input.toString().match(/^\s*$/)))) ||
        options.msg.isRequired
      );
    },
  };
};

required.Options = {
  trim: true,
  msg: {
    isRequired: 'This field is required',
  },
};
