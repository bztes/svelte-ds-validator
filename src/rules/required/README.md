# required

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

type RequiredRuleOptions = {
  trim?: boolean;
  msg?: RequiredRuleMsgs;
};

type RequiredRuleMsgs = {
  isRequired?: string;
}

declare function required(options?: RequiredRuleOptions): Rule;

declare namespace required {
  export var Options: RequiredRuleOptions;
}
```
<!--- #ECHO } -->

`true` if `input` is NOT `null`, `undefined` or `toString().length === 0`

| Options        | Default Value | Description                                                                   |
| -------------- | ------------- | ----------------------------------------------------------------------------- |
| `options.trim` | `true`        | If `true` whitespaces from both ends of the `input` string are not considered |

## Example

```js
// input must not only contain blanks
required();

// input can only contain blanks
required({ trim: false });
```
