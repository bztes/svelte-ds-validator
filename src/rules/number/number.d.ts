import 'webrtc';
import { Rule } from '../../checker';

type NumberRuleOptions = {
  min?: number;
  max?: number;
  int?: boolean;
  parseString?: boolean;
  msg?: NumberRuleMsgs;
};

type NumberRuleMsgs = {
  notANumber: string;
  notAInt: string;
  numberToSmall: string;
  numberToLarge: string;
}

declare function number(options?: NumberRuleOptions): Rule;

declare namespace number {
  export var Options: NumberRuleOptions;
}
