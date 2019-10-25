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

  add(field, message) {
    this.errors.push(new ErrorEntry(field, message));
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