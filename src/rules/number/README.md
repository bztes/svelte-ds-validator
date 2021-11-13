# number

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

type NumberRuleOptions = {
  min?: number;
  max?: number;
  int?: boolean;
  parseString?: boolean;
  msg?: NumberRuleMsgs;
};

type NumberRuleMsgs = {
  notANumber: string;
  notAInt: string;
  numberToSmall: string;
  numberToLarge: string;
}

declare function number(options?: NumberRuleOptions): Rule;

declare namespace number {
  export var Options: NumberRuleOptions;
}
```
<!--- #ECHO } -->

Evaluates as `true` if the `input` is a number or can be converted into a number.

| Options               | Default Value | Description                                                                                           |
| --------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| `options.int`         | `false`       | If `true` the `input` must be a integer value                                                         |
| `options.min`         | `undefined`   | If defined the `input` must be larger or equal to `min`                                               |
| `options.max`         | `undefined`   | If defined the `input` must be small or equal to `max`                                                |
| `options.parseString` | `true`        | If `true` an `input` value of type string is tried to be converted into a number before being checked |

## Example

```js
// input must be a integer value larger or equal to 18
number({ int: true, min: 18 });
```
