const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { validateRegister, validateLogin } = require('../validation');
const EmailReservedError = require('../errors/EmailReservedError');
const { ErrorResponse, ErrorEntry } = require('../errors/ErrorResponse');
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

function getJoiValidationErrors(error) {
  let errorEntries = [];

  if (error.details !== undefined) {
    for (detail of error.details) {
      let context = detail.context;
      let field = context.key;
      let message = context.name === undefined ? detail.message : context.name;
      
      errorEntries.push(new ErrorEntry(field, message));
    }
  }
  
  return errorEntries;
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
    
    responseBody.addAll(getJoiValidationErrors(error));

    // Sending error response
    if (responseBody.hasEntries()) {
      res.status(422).send(responseBody.compile());
    } else {
      res.status(500).send(responseBody.add('N/A', 'Server error').compile());
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    await validateLogin(req.body);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new EmailNotFoundError();
    } 

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      throw new PasswordIncorrectError();
    }

    res.send('logged in')
  } catch (error) {
    let errorResponse = new ErrorResponse();

    if (error instanceof EmailNotFoundError) {
      errorResponse.add('email', error.message);
    } else if (error instanceof PasswordIncorrectError) {
      errorResponse.add('password', error.message);
    }

    errorResponse.addAll(getJoiValidationErrors(error));

    if (errorResponse.hasEntries()) {
      res.status(422).send(errorResponse.compile());
    } else {
      res.status(500).send(errorResponse.add('N/A', 'Server error').compile());
    }
  }
});
module.exports = router;
