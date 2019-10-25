class EmailReservedError extends Error {
  constructor(address) {
    super(`Email address ${address} is already in use`);
    this.name = 'EmailReservedError';
  }
}

module.exports = EmailReservedError;