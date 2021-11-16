import { writable } from 'svelte/store';
import { required } from './';

export const createChecker = (settings) => {
  if (!settings.defaultRule) settings.defaultRule = required();

  let { subscribe, update } = writable(settings);

  function validate(input) {
    let result = false;

    update((settings) => {
      settings.valid = true;
      for (const field of Object.values(settings.fields)) {
        validateField(field, input, settings.defaultRule);
        settings.valid &&= field.valid;
      }
      result = settings.valid;
      return settings;
    });

    return result;
  }

  return { validate, subscribe };
};

export const validateField = (field, input, defaultRule) => {
  const rule = field.rule ?? defaultRule;
  const fieldValue = field.value(input);
  const validateResult = validateRule(rule, fieldValue);
  field.valid = validateResult === true;
  field.error = field.valid ? '' : rule.error ?? validateResult;
};

export const validateRule = (rule, value) => {
  return rule.validate(rule.value ? rule.value(value) : value);
};
