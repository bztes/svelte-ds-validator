import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import Integration from './integration.test.svelte';
import userEvent from '@testing-library/user-event';

test('All empty', () => {
  const { getByTestId } = render(Integration, { data: {} });

  expect(getByTestId('email-error')).toHaveTextContent('This field is required');
  expect(getByTestId('age-error')).toHaveTextContent('This field is required');
  expect(getByTestId('message-error')).toHaveTextContent('This field is required');
  expect(getByTestId('legal-error')).toHaveTextContent('Legal rules have to be accepted');
  expect(getByTestId('submit-button')).toBeDisabled();
});

test('All valid', () => {
  const { getByTestId } = render(Integration, {
    data: {
      email: 'test@example.com',
      age: 35,
      message: 'hello universe',
      legal: true,
    },
  });

  expect(getByTestId('email-error')).toHaveTextContent(/^$/);
  expect(getByTestId('age-error')).toHaveTextContent(/^$/);
  expect(getByTestId('message-error')).toHaveTextContent(/^$/);
  expect(getByTestId('legal-error')).toHaveTextContent(/^$/);
  expect(getByTestId('submit-button')).toBeEnabled();
});

test('From invalid to valid', async () => {
  const { getByTestId } = render(Integration, { data: {} });

  expect(getByTestId('email-error')).toHaveTextContent('This field is required');
  await userEvent.type(getByTestId('email-input'), 'test@');
  expect(getByTestId('email-error')).toHaveTextContent('Please enter a valid email');
  await userEvent.clear(getByTestId('email-input'));
  await userEvent.type(getByTestId('email-input'), 'test@example.com');
  expect(getByTestId('email-error')).toHaveTextContent(/^$/);
  expect(getByTestId('submit-button')).toBeDisabled();

  expect(getByTestId('age-error')).toHaveTextContent('This field is required');
  await userEvent.type(getByTestId('age-input'), '350');
  expect(getByTestId('age-error')).toHaveTextContent('Number to large');
  await userEvent.clear(getByTestId('age-input'));
  await userEvent.type(getByTestId('age-input'), '35');
  expect(getByTestId('age-error')).toHaveTextContent(/^$/);
  expect(getByTestId('submit-button')).toBeDisabled();

  expect(getByTestId('message-error')).toHaveTextContent('This field is required');
  await userEvent.type(getByTestId('message-input'), 'hello universe');
  expect(getByTestId('message-error')).toHaveTextContent(/^$/);
  expect(getByTestId('submit-button')).toBeDisabled();

  expect(getByTestId('legal-error')).toHaveTextContent('Legal rules have to be accepted');
  await userEvent.click(getByTestId('legal-input'));
  expect(getByTestId('legal-error')).toHaveTextContent(/^$/);
  expect(getByTestId('submit-button')).toBeEnabled();
});
