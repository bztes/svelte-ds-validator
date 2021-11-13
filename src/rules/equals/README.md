# equals

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

type EqualsRuleOptions = {
  msg?: EqualsRuleMsgs;
};

type EqualsRuleMsgs = {
  invalidValue?: string;
}

declare function equals(value: any, options?: EqualsRuleOptions): Rule;

declare namespace equals {
  export var Options: EqualsRuleOptions;
}
```
<!--- #ECHO } -->

`true` if `value == input`. Default for `value` is `undefined`.

## Examples

```js
// string matching
equals('confirm');

// input must be true, 1, 'abc'. same as truthy()
equals(true);
```
