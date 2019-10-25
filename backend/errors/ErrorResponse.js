class ErrorEntry {
  constructor(field, message) {
    this.field = field;
    this.message = message;
  }
}

class ErrorResponse {
  constructor() {
    this.errors = [];    
  }

  add(errorEntries = undefined, field, message) {
    if (errorEntries === undefined) {
      this.errors.push(new ErrorEntry(field, message));
    } else {
      this.errors.push(errorEntries);
    }
    
    return this;
  }

  compile() {
    return {
      errors: this.errors
    };
  }

  hasEntries() {
    return this.errors.length > 0;
  }
}

module.exports = {
  ErrorEntry,
  ErrorResponse
}