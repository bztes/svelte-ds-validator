import { writable } from 'svelte/store';
import _ from 'lodash';
import { required } from './';

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
