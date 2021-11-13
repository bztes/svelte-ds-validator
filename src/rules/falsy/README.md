# falsy

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

type FalsyRuleOptions = {
  msg?: FalsyRuleMsgs;
};

type FalsyRuleMsgs = {
  invalidValue?: string;
}

declare function falsy(options?: FalsyRuleOptions): Rule;

declare namespace falsy {
  export var Options: FalsyRuleOptions;
}
```
<!--- #ECHO } -->

Input value must evaluate to `false`: `!input`.

## Examples

```js
// valid input: false, 0, null, ...
falsy();
```
