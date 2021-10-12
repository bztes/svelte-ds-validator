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

declare function email(): Rule;

declare function equals(value: any): Rule;

declare function falsy(): Rule;

type FilesRuleOptions = {
  min?: number;
  max?: number;
  minSize?: number;
  maxSize?: number;
  type?: string;
};
declare function files(options?: FilesRuleOptions): Rule;

declare function not(rule: Rule): Rule;

type NumberRuleOptions = {
  min?: number;
  max?: number;
  int?: boolean;
  parseString?: boolean;
};
declare function number(options?: NumberRuleOptions): Rule;

declare function or(...rules: Rule[]): Rule;

declare function regex(pattern: string): Rule;

type RequiredRuleOptions = {
  trim?: boolean;
};
declare function required(options?: RequiredRuleOptions): Rule;

declare function truthy(): Rule;
