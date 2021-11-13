# not

## not(rule)

Flips the result of another rule, e.g. `not(equal(true))` passes if input value is `false, 0, null, undefined`. `rule` parameter is required

Examples

```js
// string must not contain any whitespaces
not(regex(/\s/));

// input must not be a number
not(number());
```
