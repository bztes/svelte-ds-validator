import { writable } from 'svelte/store';

export const createChecker = (settings) => {
  if (!settings.defaultRule) settings.defaultRule = required();

  let { subscribe, update } = writable(settings);

  function validate() {
    update((settings) => {
      settings.valid = true;
      for (const field of Object.values(settings.fields)) {
        const rule = field.rule ?? settings.defaultRule;
        const validateResult = rule.validate(field.value());
        field.valid = validateResult === true;
        field.error = field.valid ? '' : rule.error || validateResult;
        settings.valid &&= field.valid;
      }
      return settings;
    });
    return settings.valid;
  }

  return { validate, subscribe };
};

export const and = (...rules) => ({
  validate: function (value) {
    const success =
      rules.map((rule) => rule.validate(value)).find((success) => success !== true) || true;
    return success === true || success;
  },
});

export const email = () => ({
  validate: function (value) {
    return (
      (typeof value === 'string' &&
        !!value?.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) ||
      'Please enter a valid email'
    );
  },
});

export const equals = (value) => ({
  validate: function (input) {
    return value == input || 'Invalid value';
  },
});

export const not = (rule) => ({
  ...rule,
  validate: function (value) {
    return rule.validate(value) !== true ? true : 'Invalid value';
  },
});

export const number = (options) => {
  options = {
    min: undefined,
    max: undefined,
    int: false,
    parseString: true,
    ...options,
  };
  return {
    validate: function (input) {
      if (typeof input === 'string' && options.parseString) {
        input = Number(input);
      }

      if (typeof input !== 'number' || isNaN(input)) return 'Not a number';
      if (options.int && !Number.isInteger(input)) return 'Not an integer';
      if (options.min && input < options.min) return 'Number to small';
      if (options.max && input > options.max) return 'Number to large';
      return true;
    },
  };
};

export const or = (...rules) => ({
  validate: function (value) {
    return (
      rules.length == 0 ||
      !!rules.map((rule) => rule.validate(value)).find((success) => success === true) ||
      rules[0].validate(value)
    );
  },
});

export const regex = (pattern) => ({
  validate: function (value) {
    return !!value?.toString().match(pattern) || 'Invalid value';
  },
});

export const required = (options) => {
  options = {
    trim: true,
    ...options,
  };
  return {
    validate: function (input) {
      return (
        (input !== undefined &&
          input !== null &&
          ((!options.trim && input.toString().length > 0) ||
            (options.trim && !input.toString().match(/^\s*$/)))) ||
        'This field is required'
      );
    },
  };
};
