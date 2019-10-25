const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { validateRegister, validateLogin } = require('../validation');
const EmailReservedError = require('../errors/EmailReservedError');
const { ErrorResponse } = require('../errors/ErrorResponse');
const EmailNotFoundError = require('../errors/EmailNotFoundError');
const PasswordIncorrectError = require('../errors/PasswordIncorrectError');

async function createUser(user) {
  let hashedPassword = await bcrypt.hash(user.password, 10);
  
  return new User({
    name: user.name,
    email: user.email,
    password: hashedPassword
  });
}

router.post('/register', async (req, res) => {
  try {
    await validateRegister(req.body);
    if (await User.findOne({ email: req.body.email })) {
      throw new EmailReservedError(req.body.email);
    }

    let user = await createUser(req.body);
    let savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    let responseBody = new ErrorResponse();

    if (error instanceof EmailReservedError) {
      responseBody.add('email', error.message);
    }
    
    // Joi validation error handling
    if (error.details !== undefined) {
      for (detail of error.details) {
        let context = detail.context;
        let field = context.key;
        let message = context.name === undefined ? detail.message : context.name;
        
        responseBody.add(field, message);
      }
    }

    // Sending error response
    if (responseBody.hasEntries()) {
      res.status(422).send(responseBody.compile());
    } else {
      res.status(500).send(responseBody.add('N/A', 'Server error').compile());
    }
  }
});

module.exports = router;
