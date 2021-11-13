
import { Rule } from '../../checker';

type RegexRuleOptions = {
  msg?: RegexRuleMsgs;
};

type RegexRuleMsgs = {
  invalidValue?: string;
}

declare function regex(pattern: RegExp, options?: RegexRuleOptions): Rule;

declare namespace regex {
  export var Options: RegexRuleOptions;
}