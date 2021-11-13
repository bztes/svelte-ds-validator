# number

## number(options)

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
