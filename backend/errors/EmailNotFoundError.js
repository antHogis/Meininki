class EmailNotFoundError extends Error {
  constructor(address) {
    super(`Account with email address ${address} not found`);
    this.name = 'EmailNotFoundError';
  }
}