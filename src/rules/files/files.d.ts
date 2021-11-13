import 'webrtc';
import { Rule } from '../../checker';

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
