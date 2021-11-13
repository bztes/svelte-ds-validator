import 'webrtc';
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
