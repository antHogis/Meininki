const mongoose = require('mongoose');

let validateEmail = function(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
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