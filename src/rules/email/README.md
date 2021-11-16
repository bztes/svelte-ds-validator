# email

<!--- #RUN OUTPUT echo -e "## Definition\n\n\`\`\`js\n$(cat $(basename "$PWD").d.ts)\n\`\`\`" -->
<!--- #ECHO OUTPUT { -->
## Definition

```js

import { Rule } from '../../checker';

type EmailRuleOptions = {
  msg?: EmailRuleMsgs;
};

type EmailRuleMsgs = {
  invalidEmail?: string;
}

declare function email(options?: EmailRuleOptions): Rule;

declare namespace email {
  export var Options: EmailRuleOptions;
}
```
<!--- #ECHO } -->

Email address validation

## Example

```js
// any well formed email address
email();
```
