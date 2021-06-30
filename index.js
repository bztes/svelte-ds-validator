import { writable } from 'svelte/store';

function validateField(field) {
	let [v, msg] = field.rules
		?.map((v) => [v, v.validate(field.value())])
		.find(([v, msg]) => msg !== true) || [undefined, ''];
	field.valid = !msg;
	field.message = v?.message || msg;
	return field.valid;
}

export const createChecker = (settings) => {
	let { subscribe, update } = writable(settings);

	function validate() {
		update((settings) => {
			settings.valid = true;
			for (const field of Object.values(settings.fields)) {
				settings.valid &= validateField(field);
			}
			return settings;
		});
		return settings.valid;
	}

	return { validate, subscribe };
};

export const email = () => ({
	validate: (value) =>
		(typeof value === 'string' &&
			!!value?.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)) ||
		'Please enter a valid email'
});

export const required = (options) => {
	options = {
		trim: true,
		...options
	};
	return {
		validate: (input) =>
			(input !== undefined &&
				input !== null &&
				((!options.trim && input.toString().length > 0) ||
					(options.trim && !input.toString().match(/^\s*$/)))) ||
			'This field is required'
	};
};

export const equals = (value) => ({
	validate: (input) => value == input || 'Invalid value'
});

export const number = (options) => {
	options = {
		min: undefined,
		max: undefined,
		int: false,
		...options
	};
	return {
		validate: (input) => {
			if (typeof input !== 'number') return 'Not a number';
			if (options.int && !Number.isInteger(input)) return 'Not an integer';
			if (options.min && input < options.min) return 'Number to small';
			if (options.max && input > options.max) return 'Number to large';
			return true;
		}
	};
};

export const not = (rule) => ({
	...rule,
	validate: (value) => rule.validate(value) !== true,
	message: 'Not: ' + rule.message
});
