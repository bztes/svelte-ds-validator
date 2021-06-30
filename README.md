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
  import { createChecker, email, required, equals } from '@bztes/svelte-ds-validator';

  let message = ...;

  // apply validation rules
  let checker = createChecker({
    fields: {
      email: {
        value: () => message.email,
        rules: [required(), email()]
      },
      content: {
        value: () => message.content,
        rules: [required()]
      },
      legal: {
        value: () => message.legal,
        rules: [{ ...equals(true), message: 'Legal rules have to be accepted' }]
      }
    }
  });

  // validate on message update
  $: message, checker.validate();
</script>

<form>
  <p>
    <label for="email">E-Mail</label>
    <input type="email" name="email" bind:value={message.email} />
    <span>{$checker.fields.email.message}</span>
  </p>
  <p>
    <label for="message">Message</label>
    <textarea name="message" bind:value={message.content} />
    <span>{$checker.fields.content.message}</span>
  </p>
  <p>
    <label for="confirm">Accept</label>
    <input type="checkbox" bind:checked={message.legal} />
    <span>{$checker.fields.legal.message}</span>
  </p>
  <p>
    <button type="submit" disabled={!$checker.valid}>Send</button>
  </p>
</form>
```

## Checker

The Checker is basically a collection of input values and rules to be checked.

| Function / Properties          | Description                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| `checker.validate()`           | Function to run validation                                                           |
| `checker.valid`                | true if all input values are valid, else otherwise                                   |
| `checker.fields`               | Object of all the defined validator fields                                           |
| `checker.fields.[KEY].input`   | The function that returns the input value for the specific field                     |
| `checker.fields.[KEY].rules`   | The list of rules that are checked for the specific field                            |
| `checker.fields.[KEY].message` | If the the input is invalid this property contains the error message, null otherwise |

## Rule validators

| Validator                           | Default Value   | Description                                                                       |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| **`email()`**                       | -               | Email address validation                                                          |
| **`equal(val)`**                    | `val=undefined` | `true` if val == input                                                            |
| **`number(options)`**               | `options={...}` | `true` if the `input` is a number, else `false`                                   |
| &nbsp;&nbsp;`number.options.int`    | `false`         | If `true` the `input` must be a integer value                                     |
| &nbsp;&nbsp;`number.options.min`    | `undefined`     | If defined the `input` must be larger or equal to `min`                           |
| &nbsp;&nbsp;`number.options.max`    | `undefined`     | If defined the `input` must be small or equal to `max`                            |
| **`required(options)`**             | `options={...}` | `false` if the `input` is null, undefined or toString().length === 0, else `true` |
| &nbsp;&nbsp;`required.options.trim` | `true`          | If `true` whitespaces from both ends of the `input` string are not considered     |

## Write your own validator is simple

### Minimal example

```js
export const isTrue = () => ({
  validate: (input) => !!input || 'Values must be true',
});
```

`validate` is be a function that takes an input value and returns true or an error message

### Parameters

```js
export const equals = (value) => ({
  validate: (input) => value == input || 'Invalid value',
});
```

### Parameters as object

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
