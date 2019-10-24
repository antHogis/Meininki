const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

async function createUser(user) {
  let hashedPassword = await bcrypt.hash(user.password, 10);
  
  return new User({
    name: user.name,
    email: user.email,
    password: hashedPassword
  });
}

function createErrorJson(errors) {
  return {
    'errors': errors
  }
}

router.post('/register', async (req, res) => {
  try {
    let user = await createUser(req.body);
    try {
      let savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      let errors = [];
  
      if (error.errors !== undefined) {
        for (fieldName in error.errors) {
          let errorName = error.errors[fieldName].name;
    
          if (errorName === 'CastError') {
            errors.push(`Invalid data type for ${fieldName}`);
          }
    
          if (errorName === 'ValidatorError') {
            errors.push(`Invalid ${fieldName} format`);
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
        res.status(422).send(createErrorJson(errors));
      } else {
        res.status(500).send(createErrorJson(['Unexpected error']));
      }
    }
  } catch (error) {
    res.status(422).send(createErrorJson(['Invalid data type for password']));
  }
});

module.exports = router;
