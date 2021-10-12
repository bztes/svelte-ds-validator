import { writable } from 'svelte/store';

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
  validate: function (input) {
    const success =
      rules
        .map((rule) => rule.validate(rule.value ? rule.value(input) : input))
        .find((success) => success !== true) || true;
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

export const falsy = () => ({
  validate: (input) => !input || 'Invalid value',
});

export const files = (options) => {
  options = {
    min: 1,
    max: undefined,
    minSize: 0,
    maxSize: undefined,
    type: undefined,
    ...options,
  };
  return {
    validate: function (input) {
      if (!Array.isArray(input)) {
        return 'Invalid input type. File[] expected.';
      }

      if (options.min && input.length < options.min) {
        return `Select at least ${options.min} ${options.min > 1 ? 'files' : 'file'}`;
      }

      if (options.max && input.length > options.max) {
        return `Select a maximum of ${options.max} ${options.max > 1 ? 'files' : 'file'}`;
      }

      if (options.type && input.some((i) => !i.type?.match(options.type))) {
        return 'At least one file of the wrong type';
      }

      if (options.minSize && input.some((i) => i.size < options.minSize)) {
        return 'At least one file is to small';
      }

      if (options.maxSize && input.some((i) => i.size > options.maxSize)) {
        return 'At least one file is to large';
      }

      return true;
    },
  };
};

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

export const truthy = () => ({
  validate: (input) => Boolean(input) || 'Invalid value',
});
