import { number } from './number';

describe('number', () => {
  test('string', () => {
    let validator = number();
    expect(validator.validate('bztes')).toBe(number.Options.msg.notANumber);
  });

  test('NaN', () => {
    let validator = number();
    expect(validator.validate(NaN)).toBe(number.Options.msg.notANumber);
  });

  test('string number', () => {
    let validator = number();
    expect(validator.validate('10')).toBe(true);
  });

  test('string number, parsing false', () => {
    let validator = number({ parseString: false });
    expect(validator.validate('10')).toBe(number.Options.msg.notANumber);
  });

  test('undefined', () => {
    let validator = number();
    expect(validator.validate()).toBe(number.Options.msg.notANumber);
  });

  test('null', () => {
    let validator = number();
    expect(validator.validate(null)).toBe(number.Options.msg.notANumber);
  });

  test('function', () => {
    let validator = number();
    expect(validator.validate(() => 'bztes')).toBe(number.Options.msg.notANumber);
  });

  test('false', () => {
    let validator = number();
    expect(validator.validate(false)).toBe(number.Options.msg.notANumber);
  });

  test('undefined min', () => {
    let validator = number({ max: 1 });
    expect(validator.validate(-10000)).toBe(true);
  });

  test('undefined max', () => {
    let validator = number({ min: 1 });
    expect(validator.validate(10000)).toBe(true);
  });

  test('range', () => {
    let validator = number({ min: 1, max: 9 });
    expect(validator.validate(1)).toBe(true);
    expect(validator.validate(9)).toBe(true);
    expect(validator.validate(0)).toBe(number.Options.msg.numberToSmall);
    expect(validator.validate(10)).toBe(number.Options.msg.numberToLarge);
  });

  test('integer', () => {
    let validator = number({ int: true });
    expect(validator.validate(1.1)).toBe(number.Options.msg.notAInt);
  });
});
