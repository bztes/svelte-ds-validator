# and

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

declare function and(...rules: Rule[]): Rule;
```
<!--- #ECHO } -->

Combine multiple rules: All rules must become `true`. Default value for `rules` is `[]`.

## Examples

```js
// first checks if an input is provided and then validates the pattern
// Userfull if the required error message should be returned on an empty input
and(required(), regex(/^[0-9]{3}\/[0-9]{3}$/));

// input must be a number but not between 18 and 21
and(number(), not(number({ min: 18, max: 21 }));
```
