import { number } from '../../index';

let nanMsg = 'Not a number';
let smallMsg = 'Number to small';
let largeMsg = 'Number to large';
let intMsg = 'Not an integer';

describe('number', () => {
	test('string', () => {
		let validator = number();
		expect(validator.validate('bztes')).toBe(nanMsg);
	});

	test('undefined', () => {
		let validator = number();
		expect(validator.validate()).toBe(nanMsg);
	});

	test('null', () => {
		let validator = number();
		expect(validator.validate(null)).toBe(nanMsg);
	});

	test('function', () => {
		let validator = number();
		expect(validator.validate(() => 'bztes')).toBe(nanMsg);
	});

	test('false', () => {
		let validator = number();
		expect(validator.validate(false)).toBe(nanMsg);
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
		expect(validator.validate(0)).toBe(smallMsg);
		expect(validator.validate(10)).toBe(largeMsg);
	});

	test('integer', () => {
		let validator = number({ int: true });
		expect(validator.validate(1.1)).toBe(intMsg);
	});
});
