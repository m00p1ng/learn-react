import validate from 'validate.js';

export function validateSignUp(body: any) {
  const constraints = {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 4,
      },
    },
    passwordConfirmation: {
      equality: 'password',
    },
  };
  return validate(body, constraints);
}

export function validateSignIn(body: any) {
  const constraints = {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
    },
  };
  return validate(body, constraints);
}
