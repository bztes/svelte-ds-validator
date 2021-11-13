
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
