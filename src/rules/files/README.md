# files

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

type FilesRuleOptions = {
  min?: number;
  max?: number;
  minSize?: number;
  maxSize?: number;
  type?: string;
  msg?: FilesRuleMsgs;
};

type FilesRuleMsgs = {
  invalidInputType?: string;
  tooFewFiles?: string;
  tooManyFiles?: string;
  invalidFileType?: string;
  fileToSmall?: string;
  fileToLarge?: string;
}

declare function files(options?: FilesRuleOptions): Rule;

declare namespace files {
  export var Options: FilesRuleOptions;
}
```
<!--- #ECHO } -->

Evaluation for files input

| Options           | Default Value | Description                                                    |
| ----------------- | ------------- | -------------------------------------------------------------- |
| `options.min`     | `1`           | If defined files length must be at least `min`                 |
| `options.max`     | `undefined`   | If defined files length must not the greater than `max`        |
| `options.minSize` | `undefined`   | If defined any file size must be at least `min` (in bytes)     |
| `options.maxSize` | `undefined`   | If defined not file size must be greater than `max` (in bytes) |
| `options.type`    | `undefined`   | Mime type checking, e.g. `image/png` or `image/*\|text/plain`  |

## Example

```js
// max 5 audio files each with a max size of 5MB
files({ max: 5, maxSize: 5000000, type: 'audio/*' });
```
