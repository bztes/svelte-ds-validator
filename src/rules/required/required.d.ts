
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
