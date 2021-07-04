# svelte-ds-validator

Damn simple value validation for svelte

## Installation

```
npm i -D @bztes/svelte-ds-validator
```

```
yarn add -D @bztes/svelte-ds-validator
```

## Code Example

```js
<script>
  import { createChecker, email, equals, number, required } from '@bztes/svelte-ds-validator';

  export let data = {};

  // apply validation rules
  let checker = createChecker({
    fields: {
      email: {
        value: () => data.email,
        rules: [required(), email()],
      },
      age: {
        value: () => data.age,
        rules: [required(), number({ min: 0, max: 130, int: true })],
      },
      message: {
        value: () => data.message,
        rules: [required()],
      },
      legal: {
        value: () => data.legal,
        rules: [{ ...equals(true), error: 'Legal rules have to be accepted' }],
      },
    },
  });

  // validate on data changed
  $: data, checker.validate();
</script>

<form>
  <p>
    <label for="email">E-Mail</label>
    <input type="email" name="email" bind:value={data.email} />
    <span>{$checker.fields.email.error}</span>
  </p>
  <p>
    <label for="age">Age</label>
    <input type="number" name="age" bind:value={data.age} />
    <span>{$checker.fields.age.error}</span>
  </p>
  <p>
    <label for="message">Message</label>
    <textarea name="message" bind:value={data.message} />
    <span>{$checker.fields.message.error}</span>
  </p>
  <p>
    <label for="legal">Accept</label>
    <input type="checkbox" name="legal" bind:checked={data.legal} />
    <span>{$checker.fields.legal.error}</span>
  </p>
  <p>
    <button type="submit" disabled={!$checker.valid}>Send</button>
  </p>
</form>
```

## Checker

The Checker is a collection of input values and the rules to be checked.

| Function / Properties        | Description                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `checker.validate()`         | Runs the validation. Should be called after the input has changed                  |
| `checker.valid`              | `true` if all input values are valid, `false` otherwise                            |
| `checker.fields`             | Object with the input that should be checked. Typically on field for each variable |
| `checker.fields.[KEY].input` | This function returns the input value that should be checked                       |
| `checker.fields.[KEY].rules` | The list of validators to be applied                                               |
| `checker.fields.[KEY].error` | Contains the error message if the input is invalid, `null` otherwise               |

## Rule validators

| Validator                           | Default Value    | Description                                                                                   |
| ----------------------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| `email()`                           | -                | Email address validation                                                                      |
| `equal(val)`                        | `val=undefined`  | `true` if `val == input`                                                                      |
| `not(rule!)`                        | `rule=undefined` | flips the result of another rule, e.g. `not(equal(true))` passes if input value is not `true` |
| `number(options)`                   | `options={...}`  | `true` if the `input` is a number, else `false`                                               |
| &nbsp;&nbsp;`number.options.int`    | `false`          | If `true` the `input` must be a integer value                                                 |
| &nbsp;&nbsp;`number.options.min`    | `undefined`      | If defined the `input` must be larger or equal to `min`                                       |
| &nbsp;&nbsp;`number.options.max`    | `undefined`      | If defined the `input` must be small or equal to `max`                                        |
| `required(options)`                 | `options={...}`  | `false` if the `input` is `null`, `undefined` or `toString().length === 0`, else `true`       |
| &nbsp;&nbsp;`required.options.trim` | `true`           | If `true` whitespaces from both ends of the `input` string are not considered                 |

! = required parameters

## Writing your own validator is simple

### Minimal example

```js
export const isTrue = () => ({
  validate: (input) => !!input || 'Input value must be true',
});
```

`validate` is a function that takes an input value and returns true or an error message

### Validator with parameters

```js
export const equals = (value) => ({
  validate: (input) => value == input || 'Invalid value',
});
```

### Validator with options object

```js
export const number = (options) => {
  // provide default values
  options = {
    min: undefined,
    max: undefined,
    ...options,
  };
  return {
    validate: (input) => {
      if (typeof input !== 'number') return 'Not a number';
      if (options.min && input < options.min) return 'Number to small';
      if (options.max && input > options.max) return 'Number to large';
      return true;
    },
  };
};
```
