# svelte-ds-validator

Damn simple value checker for [Svelte](https://svelte.dev/). Most commonly used in combination with forms.

## Installation

```
npm i -D @bztes/svelte-ds-validator
```

```
yarn add -D @bztes/svelte-ds-validator
```

## 0. Example Code

```js
<script>
  import { and, createChecker, email, number, required } from '@bztes/svelte-ds-validator';

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
    <button type="submit" disabled={!$checker.valid}>Send</button>
  </p>
</form>
```

## 1. Checker

### 1.1 Create the checker

```js
const checker = createChecker({
  defaultRule: ...
  fields: {
    [field_name]: {
      value: () => ...
      rule: ...
    }
  }
});
```

**defaultRule** (Optional)  
A default rule that will be used by all checker fields where no specified rule is defined

**fields.[].rule** (Optional)  
The rule to be checked. Use `and()` or `or()` to combine rules. If no rule is provided `checker.defaultRule`, `settings.defaultRule` or `required()` is used (in this order).

**fields.[].value()**  
The function that provides the input value to be checked

### 1.2 Use the checker

```js
<script>
  ...

  const checker = ...

  // validate on data changed
  $: data, checker.validate();
</script>

<form>
  <p>
    <label for="message">Message</label>
    <textarea name="message" bind:value={data.message} />
    <span>{$checker.fields.message.error}</span>
  </p>
  <p>
    <button type="submit" disabled={!$checker.valid}>Send</button>
  </p>
</form>
```

**checker.validate()**  
Triggers the validation. You probably want to call this function after the input has changed

**$checker.fields.[].error**  
Contains the error message for the individual fields if the input is invalid, `null` otherwise

**$checker.fields.[].valid**  
`true` if the specific input value is valid, `false` otherwise

**$checker.valid**  
`true` if all input values are valid, `false` otherwise

## 2. Rules

```js
const settings = {
  fields: {
    [field_name]: {
      rule: email(),
    },
  },
};
```

### 2.1 List of rules

### and(...rules)

Combine multiple rules: All rules must become `true`. Default value for `rules` is `[]`.

Examples

```js
// first checks if an input is provided and then validates the pattern
// Userfull if the required error message should be returned on an empty input
and(required(), regex(/^[0-9]{3}\/[0-9]{3}$/));

// input must be a number but not between 18 and 21
and(number(), not(number({ min: 18, max: 21 }));
```

### email()

Email address validation.

Example

```js
// any well formed email address
email();
```

### equals(value)

`true` if `value == input`. Default for `value` is `undefined`.

Examples

```js
// string matching
equals('confirm');

// input must be true, 1, 'abc'. same as truthy()
equals(true);
```

### falsy()

Input value must evaluate to `false`: `!input`.

Examples

```js
// valid input: false, 0, null, ...
falsy();
```

### files(options)

Evaluation for files input

| Options           | Default Value | Description                                                    |
| ----------------- | ------------- | -------------------------------------------------------------- |
| `options.min`     | `1`           | If defined files length must be at least `min`                 |
| `options.max`     | `undefined`   | If defined files length must not the greater than `max`        |
| `options.minSize` | `undefined`   | If defined any file size must be at least `min` (in bytes)     |
| `options.maxSize` | `undefined`   | If defined not file size must be greater than `max` (in bytes) |
| `options.type`    | `undefined`   | Mime type checking, e.g. `image/png` or `image/*\|text/plain`  |

Example

```js
// max 5 audio files each with a max size of 5MB
files({ max: 5, maxSize: 5000000, type: 'audio/*' });
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

### truthy()

Input value must evaluate to `true`: `Boolean(input)`.

Examples

```js
// valid input: true, 1, 'abc', ...
truthy();
```

## 2.3. Custom error messages

Examples

```js
const options = {
  msg: {
    invalidValue: 'whitespaces not allowed',
  },
};
not(regex(/\s/), options);
```

```js
const options = {
  min: 18,
  msg = {
    numberToSmall: 'adults only',
  },
};
number(options);
```

## 2.2. Advanced: rule interface

```js
rule = {
  validate: ...
  value: (input) => ...
  error: ...
}
```

**validate**  
Validation function that takes an input value and returns true on validation success or an error message otherwise

**value(input)** (Optional)  
Function that can be used to provide a rule specific input value

**error** (Optional)  
Can be used to overwrite the error message of an existing rule

### Provide a custom error message

```js
const checker = createChecker({
  fields: {
    legal: {
      value: () => data.legal,
      rule: { ...equals(true), error: 'Legal rules have to be accepted' },
    },
  },
});
```

### Provide a rule specific input value

```js
let message = { response: 'Succeed', error: null };

const checker = createChecker({
  fields: {
    message: {
      value: () => message,
      rule: and({ ...required(), value: (v) => v.response }, { ...falsy(), value: (v) => v.error }),
    },
  },
});
```

### Writing a rule (examples)

**Static**

```js
const isTrue = {
  validate: (input) => input === true || 'Input value must be true',
};
```

**With parameters**

```js
const equals = (value) => ({
  validate: (input) => value == input || 'Invalid value',
});
```
