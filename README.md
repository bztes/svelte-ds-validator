# svelte-ds-validator

Damn simple value checker for [Svelte](https://svelte.dev/). Most commonly used in combination with forms.

## 0. Installation

```
npm i -D @bztes/svelte-ds-validator
```

```
yarn add -D @bztes/svelte-ds-validator
```

### 0-1 Code Example

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
        // Default rule can be skipped
        // rule: required(),
      },
      legal: {
        value: () => data.legal,
        // provide a custom error message
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

## 1. Create a Checker

```js
let settings = {
  fields: {
    field_1: { ... }
  }
}
let checker = createChecker(settings);
```

### Settings

**settings.defaultRule**  
A default rule will be used by all fields of the checker where nothing else is specified

**settings.fields.\*.rule**  
The rule to be checked. Use `and()` or `or()` to combine rules. Default value is `settings.defaultRule` or `required()`

**settings.fields.\*.value**  
A function the returns the value to be checked

### Checker

**checker.validate()**  
Triggers the validation. May be called after the input has changed

**$checker.fields.\*.error**  
Contains the error message if the input is invalid, `null` otherwise

**$checker.fields.\*.valid**  
`true` if the input value is valid, `false` otherwise

**$checker.valid**  
`true` if all input values are valid, `false` otherwise

## 2. Rules

```js
let settings = {
  fields: {
    field_1: { rule: ... }
  }
}
```

### and(...rules)

Combine multiple rules: All rules must become `true`. Default value for `rules` is `[]`.

Examples

```js
// having various error messages: first checks if an input is provided and then validates the pattern
and(required(), regex(/^[0-9]{3}\/[0-9]{3}$/))

// input must be a number but not between 18 and 21
and(number(), not(number({ min: 18, max: 21 }))
```

### email()

Email address validation.

Example

```js
// nothing to say here
email();
```

### equals(value)

`true` if `value == input`. Default for `value` is `undefined`.

Examples

```js
// string matching
equals('confirm');

// input must be true, 1 or "1"
equals(true);
```

### not(rule)

Flips the result of another rule, e.g. `not(equal(true))` passes if input value is `false, 0, null, undefined`. `rule` parameter is required

Examples

```js
// string must not contain any whitespaces
not(regex(/\s/));

// input must not be a number
not(number());
```

### number(options)

Evaluates as `true` if the `input` is a number or can be converted into a number.

| Options               | Default Value | Description                                                                                           |
| --------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| `options.int`         | `false`       | If `true` the `input` must be a integer value                                                         |
| `options.min`         | `undefined`   | If defined the `input` must be larger or equal to `min`                                               |
| `options.max`         | `undefined`   | If defined the `input` must be small or equal to `max`                                                |
| `options.parseString` | `true`        | If `true` an `input` value of type string is tried to be converted into a number before being checked |

Example

```js
// input must be a integer value larger or equal to 18
number({ int: true, min: 18 });
```

### or(...rules)

Combine multiple rules: At least one rule must become `true`. Returns `true` if no rules are provided. Default value for `rules` is `[]`.

Example

```js
// input must be a number or empty
or(number(), not(required()));
```

### regex(pattern)

`true` if the `input` value matches the specified pattern. If the `input` is not a string it will be converted automatically by using `toString()`.

Examples

```js
// only characters between a-z and A-Z
regex(/^[a-z]+$/i);

// must contain at least one colon
regex(/:/);

// matches any string that ends with @intra.net
regex(/\@intra.net$/);
```

### required(options)

`true` if `input` is NOT `null`, `undefined` or `toString().length === 0`

| Options        | Default Value | Description                                                                   |
| -------------- | ------------- | ----------------------------------------------------------------------------- |
| `options.trim` | `true`        | If `true` whitespaces from both ends of the `input` string are not considered |

Example

```js
// input must not only contain blanks
required();

// input can only contain blanks
required({ trim: false });
```

## 3. Custome rules

### Minimal example

```js
const isTrue = {
  validate: (input) => !!input || 'Input value must be true',
};
```

`validate` is a function that takes an input value and returns true or an error message

### Rule with parameters

```js
const equals = (value) => ({
  validate: (input) => value == input || 'Invalid value',
});
```

### Rule with options object

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
