import 'webrtc';
import { Readable } from 'svelte/store';

interface Settings {
  defaultRule?: Rule;
  fields: Record<string, Field>;
}

interface Field {
  rule?: Rule;
  value: () => any;
}

interface Rule {
  validate: (input?: any) => string | boolean;
  value?: (fieldValue?: any) => any;
  error?: string;
}

interface Checker extends Readable<Store> {
  validate: () => boolean;
}

interface Store {
  fields: Record<string, FieldStore>;
  valid: boolean;
}

type FieldStore = {
  error: string;
  valid: boolean;
};

declare function createChecker(settings: Settings): Checker;

declare function and(...rules: Rule[]): Rule;

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

type FilesRuleOptions = {
  min?: number;
  max?: number;
  minSize?: number;
  maxSize?: number;
  type?: string;
  msg?: FilesRuleMsgs;
};
type FilesRuleMsgs = {
  invalidInputType?: string;
  tooFewFiles?: string;
  tooManyFiles?: string;
  invalidFileType?: string;
  fileToSmall?: string;
  fileToLarge?: string;
}
declare function files(options?: FilesRuleOptions): Rule;
declare namespace files {
  export var Options: FilesRuleOptions;
}

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

declare function or(...rules: Rule[]): Rule;

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
