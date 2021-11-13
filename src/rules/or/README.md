# or

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

declare function or(...rules: Rule[]): Rule;
```
<!--- #ECHO } -->

Combine multiple rules: At least one rule must become `true`. Returns `true` if no rules are provided. Default value for `rules` is `[]`.

## Example

```js
// input must be a number or empty
or(number(), not(required()));
```
