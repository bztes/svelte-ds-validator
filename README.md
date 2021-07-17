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
  import { and, createChecker, email, equals, number, required } from '@bztes/svelte-ds-validator';

  export let data;

  // apply validation rules
  const checker = createChecker({
    fields: {
      email: {
        value: () => data.email,
        rule: and(required(), email()),
      },
      age: {
        value: () => data.age,
        rule: and(required(), number({ min: 0, max: 130, int: true })),
      },
      message: {
        value: () => data.message,
        rule: required(),
      },
      legal: {
        value: () => data.legal,
        // overwrite equals-rule to provide a custom error message
        rule: { ...equals(true), error: 'Legal rules have to be accepted' },
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
| `checker.fields.[KEY].value` | This function returns the input value that should be checked                       |
| `checker.fields.[KEY].rule`  | The rule that should be checked. Use `and()` or `or()` to combine rules            |
| `checker.fields.[KEY].error` | Contains the error message if the input is invalid, `null` otherwise               |

## Rule validators

### and(...rules)

Combine multiple rules: All rules must become `true`. Default value for `rules` is `[]`.

Example

```js
const checker = createChecker({
  fields: {
    status: {
      value: () => user.status,
      rule: and(required(), regex(/@intra.net$/)),
    },
  },
});
```

### email()

Email address validation.

Example

```js
const checker = createChecker({
  fields: {
    email: {
      value: () => user.email,
      rule: email(),
    },
  },
});
```

### equals(value)

`true` if `value == input`. Default for `value` is `undefined`.

Example

```js
const checker = createChecker({
  fields: {
    confirm: {
      value: () => terms.confirm,
      rule: equals(true),
    },
  },
});
```

### not(rule)

Flips the result of another rule, e.g. `not(equal(true))` passes if input value is `false, 0, null, undefined`. `rule` parameter is required

Example

```js
const checker = createChecker({
  fields: {
    status: {
      path: () => user.path,
      rule: not(regex(/\s/)),
    },
  },
});
```

### number(options)

Evaluates as `true` if the `input` is a number.

| Options       | Default Value | Description                                             |
| ------------- | ------------- | ------------------------------------------------------- |
| `options.int` | `false`       | If `true` the `input` must be a integer value           |
| `options.min` | `undefined`   | If defined the `input` must be larger or equal to `min` |
| `options.max` | `undefined`   | If defined the `input` must be small or equal to `max`  |

Example

```js
const checker = createChecker({
  fields: {
    age: {
      value: () => user.age,
      rule: number({ int: true, min: 18 }),
    },
  },
});
```

### or(...rules)

Combine multiple rules: At least one rule must become `true`. Returns `true` if no rules are provided. Default value for `rules` is `[]`.

Example

```js
const checker = createChecker({
  fields: {
    status: {
      phone: () => user.phone,
      rule: or(number(), not(required())),
    },
  },
});
```

### reqex(pattern)

`true` if the `input` value matches the specified pattern. If the `input` is not a string it will be converted automatically by using `toString()`.

Example

```js
const checker = createChecker({
  fields: {
    username: {
      value: () => user.name,
      rule: regex(/^[a-z][a-z0-9_-]+$/i),
    },
  },
});
```

### required(options)

`true` if `input` is NOT `null`, `undefined` or `toString().length === 0`

| Options        | Default Value | Description                                                                   |
| -------------- | ------------- | ----------------------------------------------------------------------------- |
| `options.trim` | `true`        | If `true` whitespaces from both ends of the `input` string are not considered |

Example

```js
const checker = createChecker({
  fields: {
    address: {
      value: () => user.address,
      rule: required(),
    },
  },
});
```

## Writing your own validator is simple

### Minimal example

```js
const isTrue = () => ({
  validate: (input) => !!input || 'Input value must be true',
});
```

`validate` is a function that takes an input value and returns true or an error message

### Validator with parameters

```js
const equals = (value) => ({
  validate: (input) => value == input || 'Invalid value',
});
```

### Validator with options object

```js
const number = (options) => {
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
