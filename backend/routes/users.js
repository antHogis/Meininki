const express = require('express');
const router = express.Router();
const User = require('../models/User');

function createUser(user) {
  return new User({
    name: user.name,
    email: user.email,
    password: user.password
  });
}

router.post('/register', async (req, res) => {
  let savedUser;
  try {
    savedUser = await createUser(req.body).save();
    res.send(savedUser);
  } catch (error) {
    let errors = [];

    if (error.errors !== undefined) {
      for (fieldName in error.errors) {
        let errorName = error.errors[fieldName].name;
  
        if (errorName === 'CastError') {
          errors.push(`Invalid data type for ${fieldName}`);
        }
  
        if (fieldName === 'email' && errorName === 'ValidatorError') {
          errors.push('Invalid email format');
        }
      }
    }
    
    if (error.name === 'MongoError') {
      if (error.code === 11000) {
        for (field in error.keyValue) {
          errors.push(`Duplicate ${field}`);
        }
      }
    }

    if (errors.length) {
      res.status(422).send({'error': errors});
    } else {
      res.status(500).send({'error': ['Unexpected error']});
    }
  }
});

module.exports = router;
