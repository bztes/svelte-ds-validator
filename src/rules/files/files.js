import _ from 'lodash';
import IntlMessageFormat from 'intl-messageformat';

const locale = 'en-us';

export const files = (options) => {
  options = _.defaultsDeep(options || {}, files.Options);
  return {
    validate: function (input) {
      if (!Array.isArray(input)) {
        return options.msg.invalidInputType;
      }

      if (options.min && input.length < options.min) {
        return new IntlMessageFormat(options.msg.tooFewFiles, locale).format(options);
      }

      if (options.max && input.length > options.max) {
        return new IntlMessageFormat(options.msg.tooManyFiles, locale).format(options);
      }

      if (options.type && input.some((i) => !i.type?.match(options.type))) {
        return options.msg.invalidFileType;
      }

      if (options.minSize && input.some((i) => i.size < options.minSize)) {
        return options.msg.fileToSmall;
      }

      if (options.maxSize && input.some((i) => i.size > options.maxSize)) {
        return options.msg.fileToLarge;
      }

      return true;
    },
  };
};

files.Options = {
  min: 1,
  max: undefined,
  minSize: 0,
  maxSize: undefined,
  type: undefined,
  msg: {
    invalidInputType: 'Invalid input type. File[] expected.',
    tooFewFiles: 'Select at least {min} {min, plural, =1 {file} other {files}}',
    tooManyFiles: 'Select a maximum of {max} {max, plural, =1 {file} other {files}}',
    invalidFileType: 'At least one file of the wrong type',
    fileToSmall: 'At least one file is to small',
    fileToLarge: 'At least one file is to large',
  },
};
