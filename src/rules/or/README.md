# or

## or(...rules)

Combine multiple rules: At least one rule must become `true`. Returns `true` if no rules are provided. Default value for `rules` is `[]`.

Example

```js
// input must be a number or empty
or(number(), not(required()));
```
