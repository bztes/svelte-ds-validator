import { Rule } from '../../checker';

type TruthyRuleOptions = {
  msg?: TruthyRuleMsgs;
};
type TruthyRuleMsgs = {
  invalidValue?: string;
}
declare function truthy(options?: TruthyRuleOptions): Rule;
declare namespace truthy {
  export var Options: TruthyRuleOptions;
}
