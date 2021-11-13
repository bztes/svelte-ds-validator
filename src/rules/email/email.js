import _ from 'lodash';

export const email = (options) => {
  options = _.defaultsDeep(options || {}, email.Options);
  return {
    validate: (value) => {
      return (
        (typeof value === 'string' &&
          !!value?.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) ||
        options.msg.invalidEmail
      );
    },
  };
};

email.Options = {
  msg: {
    invalidEmail: 'Please enter a valid email',
  },
};
