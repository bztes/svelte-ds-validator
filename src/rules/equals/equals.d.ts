
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
