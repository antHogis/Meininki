class PasswordIncorrectError extends Error {
  constructor() {
    super('Incorrect password');
    this.name = 'PasswordIncorrectError';
  }
}