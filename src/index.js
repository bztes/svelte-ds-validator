import { createChecker } from './checker';
import { and } from './rules/and/and';
import { email } from './rules/email/email';
import { equals } from './rules/equals/equals';
import { falsy } from './rules/falsy/falsy';
import { files } from './rules/files/files';
import { not } from './rules/not/not';
import { number } from './rules/number/number';
import { or } from './rules/or/or';
import { regex } from './rules/regex/regex';
import { required } from './rules/required/required';
import { truthy } from './rules/truthy/truthy';

export {
  createChecker,
  and,
  email,
  equals,
  required,
  falsy,
  files,
  not,
  number,
  or,
  regex,
  truthy,
};
