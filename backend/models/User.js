const mongoose = require('mongoose');

let validateEmail = function(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

let validateName = function(name) {
  return /^[a-z0-9_-]{6,16}$/i.test(name);
}

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: [
      validateName,
      'Name must be between 6-16 characters, and contain nothing but letters, numbers, hyphens, and underscores'
    ]
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [
      validateEmail,
      'Valid email address required'
    ]
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema, 'users');