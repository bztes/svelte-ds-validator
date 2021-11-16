# svelte-ds-validator

Simple value checker for [Svelte](https://svelte.dev/)

- Works well with HTML forms
- Can be used with any input data structure. No conversion needed
- Customizable error messages

## -1. Installation

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
        value: (data) => data.email,
        rule: and(required(), email()),
      },
      age: {
        value: (data) => data.age,
        rule: and(required(), number({ min: 0, max: 130, int: true })),
      },
      message: {
        value: (data) => data.message,
        // Default rule can be skipped
        // rule: required(),
      },
    },
  });

  // validate on data changed
  $: checker.validate(data);
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

### Create a checker

```js
const checker = createChecker({
  defaultRule: ...
  fields: {
    [field_name]: {
      value: (input) => ...
      rule: ...
    }
  }
});
```

**defaultRule** (Optional)  
The default rule is used as a fallback if not other rule is provided by the fields

**fields.[field_name].rule** (Optional)  
The rule to be checked. Use `and()` or `or()` to combine rules. If no rule is provided `checker.defaultRule` or `settings.defaultRule` or lastly `required()` is used.

**fields.[field_name].value(input)**  
Function returns the value that should be checked. `input` is the value provided by `checker.validate(input)`

### Validate

```js
<script>
  ... const checker = ... // validate on input data changed $: checker.validate(input);
</script>
```

**checker.validate()**  
Triggers the validation. You might want to call this function every time the input has changed

### Result store

```html
<form>
  <p>
    <label for="message">Message</label>
    <textarea name="message" bind:value="{data.message}" />
    <span>{$checker.fields.message.error}</span>
  </p>
  <p>
    <button type="submit" disabled="{!$checker.valid}">Send</button>
  </p>
</form>
```

**$checker.fields.[field_name].error**  
Contains the error message for the individual fields if the input is invalid, `null` otherwise

**$checker.fields.[field_name].valid**  
`true` if the specific input value is valid, `false` otherwise

**$checker.valid**  
`true` if all input values are valid, `false` otherwise

## 2. Rules

### Apply rules to a checker

```js
const settings = {
  fields: {
    userMail: {
      rule: email(),
    },
  },
};
```

### Available rules

<!--- #RUN OUTPUT find ./src/rules/ -maxdepth 2 -type f -iname 'README.md' -exec head -n 1 {} \; | sort | sed -E 's/#+ (.*)/- [\1](https:\/\/github.com\/bztes\/svelte-ds-validator\/blob\/main\/src\/rules\/\1\/README.md)/g' -->
<!--- #ECHO OUTPUT { -->
- [and](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/and/README.md)
- [email](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/email/README.md)
- [equals](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/equals/README.md)
- [falsy](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/falsy/README.md)
- [files](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/files/README.md)
- [not](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/not/README.md)
- [number](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/number/README.md)
- [or](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/or/README.md)
- [regex](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/regex/README.md)
- [required](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/required/README.md)
- [truthy](https://github.com/bztes/svelte-ds-validator/blob/main/src/rules/truthy/README.md)
<!--- #ECHO } -->

## 3. Custome error messages

### local - only for the specified rule instance

```js
const options = {
  min: 18,
  msg = {
    numberToSmall: 'adults only',
  },
};
rule = number(options);
```

### global - default for all rule instances

```js
number.Options.msg.numberToSmall = 'adults only';
```

## 4. Advanced

### Rule definition

**Static**

```js
rule = {
  validate(input): true | string
  value(fieldValue)?: any
  error?: string
}
```

**validate**  
Validation function that takes an input value and returns true if the validation success or an error message otherwise

**value(input)** (Optional)  
Provides a rule specific input value for `rule.validate()`. If undefined the value from `field_name.value()` is used

**error** (Optional)  
Provides a rule specific error message. If undefined the return value from `rule.validate()` is used as error message

### Writing your own rule (examples)

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

### Overwrite all error messages for a rule

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

### Rule specific input values (value mapping)

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
