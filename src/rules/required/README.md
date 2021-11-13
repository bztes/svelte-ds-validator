# required

## required(options)

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
