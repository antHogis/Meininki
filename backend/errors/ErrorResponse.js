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

  addAll(errorEntries) {
    this.errors.push(...errorEntries);
    return this;
  }  

  compile() {
    return {
      errors: this.errors
    };
  }

  static default() {
    return {
      errors: [new ErrorEntry('N/A', 'ServerError')]
    }
  }

  hasEntries() {
    return this.errors.length > 0;
  }
}

module.exports = {
  ErrorEntry,
  ErrorResponse
}