import { writable } from 'svelte/store';

function validateField(field) {
	let [v, msg] = field.rules
		?.map((v) => [v, v.validate(field.value())])
		.find(([v, msg]) => msg !== true) || [undefined, ''];
	field.valid = !msg;
	field.message = v?.message || msg;
	return field.valid;
}

export const createValidator = (settings) => {
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
		!!value?.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		) || 'Please enter a valid email'
});

export const required = () => ({
	validate: (value) =>
		(value !== undefined && value !== null && value !== '') || 'This field is required'
});

export const equals = (value) => ({
	validate: (value2) => value == value2 || 'This field is required'
});

export const number = (min, max) => ({
	validate: (value) => {
		if (value < min) return 'Number to small';
		if (value > max) return 'Number to large';
		return true;
	}
});

export const not = (rule) => ({
	...rule,
	validate: (value) => rule.validate(value) !== true,
	message: 'Not: ' + rule.message
});
