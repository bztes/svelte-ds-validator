import { email } from '../../index';

let errorMsg = 'Please enter a valid email';

describe('email', () => {
  test('empty string', () => {
    let validator = email();
    expect(validator.validate('')).toBe(errorMsg);
  });

  test('whitespaces', () => {
    let validator = email();
    expect(validator.validate(' \t')).toBe(errorMsg);
  });

  test('undefined', () => {
    let validator = email();
    expect(validator.validate()).toBe(errorMsg);
  });

  test('null', () => {
    let validator = email();
    expect(validator.validate(null)).toBe(errorMsg);
  });

  test('true', () => {
    let validator = email();
    expect(validator.validate(true)).toBe(errorMsg);
  });

  test('function', () => {
    let validator = email();
    expect(validator.validate(() => 'sada')).toBe(errorMsg);
  });

  test('string', () => {
    let validator = email();
    expect(validator.validate('a123')).toBe(errorMsg);
  });

  test('missing tld', () => {
    let validator = email();
    expect(validator.validate('a123@sdfsd')).toBe(errorMsg);
  });

  test('short tld', () => {
    let validator = email();
    expect(validator.validate('a123@bla.d')).toBe(errorMsg);
  });

  test('short tld with subdomain', () => {
    let validator = email();
    expect(validator.validate('a123@bla.serv.d')).toBe(errorMsg);
  });

  test('double @', () => {
    let validator = email();
    expect(validator.validate('a123@@bla.com')).toBe(errorMsg);
  });

  test('newline @', () => {
    let validator = email();
    expect(validator.validate('a12\n3@bla.com')).toBe(errorMsg);
  });

  test('missing user', () => {
    let validator = email();
    expect(validator.validate('@sdfsd.de')).toBe(errorMsg);
  });

  test('whitespace user', () => {
    let validator = email();
    expect(validator.validate('  @sdfsd.de')).toBe(errorMsg);
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
