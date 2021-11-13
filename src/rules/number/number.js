import _ from 'lodash';

export const number = (options) => {
  options = _.defaultsDeep(options || {}, number.Options);
  return {
    validate: function (input) {
      if (typeof input === 'string' && options.parseString) {
        input = Number(input);
      }

      if (typeof input !== 'number' || isNaN(input)) return options.msg.notANumber;
      if (options.int && !Number.isInteger(input)) return options.msg.notAInt;
      if (options.min && input < options.min) return options.msg.numberToSmall;
      if (options.max && input > options.max) return options.msg.numberToLarge;
      return true;
    },
  };
};

number.Options = {
  min: undefined,
  max: undefined,
  int: false,
  parseString: true,
  msg: {
    notANumber: 'Not a number',
    notAInt: 'Not an integer',
    numberToSmall: 'Number to small',
    numberToLarge: 'Number to large',
  },
};
