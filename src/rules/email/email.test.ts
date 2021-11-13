import { email } from './email';

describe('email', () => {
  test('empty string', () => {
    let validator = email();
    expect(validator.validate('')).toBe(email.Options.msg.invalidEmail);
  });

  test('whitespaces', () => {
    let validator = email();
    expect(validator.validate(' \t')).toBe(email.Options.msg.invalidEmail);
  });

  test('undefined', () => {
    let validator = email();
    expect(validator.validate()).toBe(email.Options.msg.invalidEmail);
  });

  test('null', () => {
    let validator = email();
    expect(validator.validate(null)).toBe(email.Options.msg.invalidEmail);
  });

  test('true', () => {
    let validator = email();
    expect(validator.validate(true)).toBe(email.Options.msg.invalidEmail);
  });

  test('function', () => {
    let validator = email();
    expect(validator.validate(() => 'sada')).toBe(email.Options.msg.invalidEmail);
  });

  test('string', () => {
    let validator = email();
    expect(validator.validate('a123')).toBe(email.Options.msg.invalidEmail);
  });

  test('missing tld', () => {
    let validator = email();
    expect(validator.validate('a123@sdfsd')).toBe(email.Options.msg.invalidEmail);
  });

  test('short tld', () => {
    let validator = email();
    expect(validator.validate('a123@bla.d')).toBe(email.Options.msg.invalidEmail);
  });

  test('short tld with subdomain', () => {
    let validator = email();
    expect(validator.validate('a123@bla.serv.d')).toBe(email.Options.msg.invalidEmail);
  });

  test('double @', () => {
    let validator = email();
    expect(validator.validate('a123@@bla.com')).toBe(email.Options.msg.invalidEmail);
  });

  test('newline @', () => {
    let validator = email();
    expect(validator.validate('a12\n3@bla.com')).toBe(email.Options.msg.invalidEmail);
  });

  test('missing user', () => {
    let validator = email();
    expect(validator.validate('@sdfsd.de')).toBe(email.Options.msg.invalidEmail);
  });

  test('whitespace user', () => {
    let validator = email();
    expect(validator.validate('  @sdfsd.de')).toBe(email.Options.msg.invalidEmail);
  });

  test('valid', () => {
    let validator = email();
    expect(validator.validate('a123@bla.de')).toBe(true);
  });

  test('valid subdomain', () => {
    let validator = email();
    expect(validator.validate('a123@bla.serv.com')).toBe(true);
  });
});
