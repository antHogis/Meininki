const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

async function createUser(user) {
  let hashedPassword = await bcrypt.hash(user.password, 10);
  
  return new User({
    name: user.name,
    email: user.email,
    password: hashedPassword
  });
}

function ErrorResponseBody(errors) {
  this.errors = errors;
}

function ErrorEntry(field, message) {
  this.field = field;
  this.message = message;
}

const userSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z0-9_-]{6,16}$/i, {
      name: 'Must be 6-16 characters, can only contain letters, numbers, underscores and hyphens'
    }),
  email: Joi.string()
    .email(),
  password: Joi.string()
    .min(8)
    .max(64)
});

router.post('/register', async (req, res) => {
  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    let user = await createUser(req.body);
    let savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    let errors = [];
    
    // Joi validation error handling
    if (error.details !== undefined) {
      for (detail of error.details) {
        let context = detail.context;
        let field = context.key;
        let message = context.name === undefined ? detail.message : context.name;
  
        errors.push(new ErrorEntry(field, message));
      }
    }

    // MongoDB Unique constraint violation error handling
    if (error.name !== undefined && error.name === 'MongoError') {
      if (error.code === 11000) {
        for (field in error.keyValue) {
          if (field === 'email') {
            errors.push(new ErrorEntry(field, 
              `Address ${error.keyValue[field]} is already in use.`))
          }
        }
      }
    }

    // Sending error response
    if (errors.length) {
      res.status(422).send(new ErrorResponseBody(errors));
    } else {
      res.status(500).send(new ErrorResponseBody(new ErrorEntry('N/A', 'Server error')));
    }
  }
});

module.exports = router;
