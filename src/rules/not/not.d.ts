import 'webrtc';
import { Rule } from '../../checker';

type NotRuleOptions = {
  msg?: NotRuleMsgs;
};

type NotRuleMsgs = {
  invalidValue?: string;
}

declare function not(rule: Rule, options?: NotRuleOptions): Rule;

declare namespace not {
  export var Options: NotRuleOptions;
}
