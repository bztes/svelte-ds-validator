import { writable } from 'svelte/store';
import _ from 'lodash';
import IntlMessageFormat from 'intl-messageformat';

const locale = 'en-us';

export const createChecker = (settings) => {
  if (!settings.defaultRule) settings.defaultRule = required();

  let { subscribe, update } = writable(settings);

  function validate() {
    let result = false;

    update((settings) => {
      settings.valid = true;
      for (const field of Object.values(settings.fields)) {
        const rule = field.rule ?? settings.defaultRule;
        const value = rule.value ? rule.value(field.value()) : field.value();
        const validateResult = rule.validate(value);
        field.valid = validateResult === true;
        field.error = field.valid ? '' : rule.error ?? validateResult;
        settings.valid &&= field.valid;
      }
      result = settings.valid;
      return settings;
    });

    return result;
  }

  return { validate, subscribe };
};

export const and = (...rules) => ({
  validate: (input) => {
    const success =
      rules
        .map((rule) => rule.validate(rule.value ? rule.value(input) : input))
        .find((success) => success !== true) || true;
    return success === true || success;
  },
});

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

export const or = (...rules) => ({
  validate: function (input) {
    return (
      rules.length == 0 ||
      !!rules
        .map((rule) => rule.validate(rule.value ? rule.value(input) : input))
        .find((success) => success === true) ||
      rules[0].validate(input)
    );
  },
});

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
