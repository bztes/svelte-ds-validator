# regex

## regex(pattern)

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
