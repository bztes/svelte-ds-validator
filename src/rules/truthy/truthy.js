export const truthy = () => {
  return {
    validate: (input) => Boolean(input) || 'Invalid value',
  };
};
truthy.Options = {
  msg: {
    invalidValue: 'Invalid value',
  },
};
