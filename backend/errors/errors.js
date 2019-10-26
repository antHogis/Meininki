class EmailNotFoundError extends Error {
  constructor(address) {
    super(`Account with email address ${address} not found`);
    this.name = 'EmailNotFoundError';
  }
}

class EmailReservedError extends Error {
  constructor(address) {
    super(`Email address ${address} is already in use`);
    this.name = 'EmailReservedError';
  }
}

class PasswordIncorrectError extends Error {
  constructor() {
    super('Incorrect password');
    this.name = 'PasswordIncorrectError';
  }
}

module.exports = {
  EmailNotFoundError,
  EmailReservedError,
  PasswordIncorrectError
}