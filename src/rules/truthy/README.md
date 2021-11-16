# truthy

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js
import { Rule } from '../../checker';

type TruthyRuleOptions = {
  msg?: TruthyRuleMsgs;
};
type TruthyRuleMsgs = {
  invalidValue?: string;
}
declare function truthy(options?: TruthyRuleOptions): Rule;
declare namespace truthy {
  export var Options: TruthyRuleOptions;
}
```
<!--- #ECHO } -->

Input value must evaluate to `true`. Same as `Boolean(input)`.

## Examples

```js
// valid input: true, 1, 'abc', ...
truthy();
```
