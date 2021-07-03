<script>
  import { createChecker, email, equals, number, required } from '../index';

  export let data;

  // apply validation rules
  let checker = createChecker({
    fields: {
      email: {
        value: () => data.email,
        rules: [required(), email()],
      },
      age: {
        value: () => data.age,
        rules: [required(), number({ min: 0, max: 130, int: true })],
      },
      message: {
        value: () => data.message,
        rules: [required()],
      },
      legal: {
        value: () => data.legal,
        rules: [{ ...equals(true), error: 'Legal rules have to be accepted' }],
      },
    },
  });

  // validate on data changed
  $: data, checker.validate();
</script>

<form>
  <p>
    <label for="email">E-Mail</label>
    <input data-testid="email-input" type="email" name="email" bind:value={data.email} />
    <span data-testid="email-error">{$checker.fields.email.error}</span>
  </p>
  <p>
    <label for="age">Age</label>
    <input data-testid="age-input" type="number" name="age" bind:value={data.age} />
    <span data-testid="age-error">{$checker.fields.age.error}</span>
  </p>
  <p>
    <label for="message">Message</label>
    <textarea data-testid="message-input" name="message" bind:value={data.message} />
    <span data-testid="message-error">{$checker.fields.message.error}</span>
  </p>
  <p>
    <label for="legal">Accept</label>
    <input data-testid="legal-input" type="checkbox" name="legal" bind:checked={data.legal} />
    <span data-testid="legal-error">{$checker.fields.legal.error}</span>
  </p>
  <p>
    <button data-testid="submit-button" type="submit" disabled={!$checker.valid}>Send</button>
  </p>
</form>
