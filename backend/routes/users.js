const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { validateRegister, validateLogin, getJoiValidationErrors } = require('../validation');
const { verifyToken } = require('../authorization');
const { ErrorResponse, ErrorEntry } = require('../errors/ErrorResponse');
const { 
  EmailReservedError, 
  EmailNotFoundError, 
  PasswordIncorrectError,
  InvalidTokenIdError
} = require('../errors/errors');

async function createUser(user) {
  let hashedPassword = await bcrypt.hash(user.password, 10);
  
  return new User({
    name: user.name,
    email: user.email,
    password: hashedPassword
  });
}

function createUserBody(user) {
  return {
    _id: user.get('_id'),
    name: user.get('name'),
  };
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

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token)
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
      console.log(error);
      res.status(500).send(errorResponse.add('N/A', 'Server error').compile());
    }
  }
});

router.post('/verify', verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(500).send(ErrorResponse.default());
  }

  let user = await User.findById({_id: req.user._id});
  
  if (user) {
    res.send(createUserBody(user));
  } else {
    res.status(404).send(new ErrorResponse().add('token', 'User not found'));
  }
});

module.exports = router;
