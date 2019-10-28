const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const {
  validateRegister, 
  validateLogin,
  validateUserUpdate,
  getJoiValidationErrors } = require('../validation');
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

router.get('/:id', async (req, res) => {
  let id = req.params.id;

  let user = await User.findById(id);

  if (user) {
    res.send(createUserBody(user));
  } else {
    res.status(404).send(new ErrorResponse().add('id', 'Invalid id').compile());
  }
});

router.put('/update', verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(500).send(ErrorResponse.default());
  }
  try {
    let user = await User.findById({_id: req.user._id});
    
    if (!user) {
      throw new InvalidTokenIdError();
    }

    await validateUserUpdate(req.body, user);
    
    if (req.body.password 
      && !(await bcrypt.compare(req.body.oldPassword, user.password))) {
        throw new PasswordIncorrectError();
    } else if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.body.email
      && await User.findOne({ email: req.body.email })) {
      throw new EmailReservedError(req.body.email);
    }

    let update = {};
    if (req.body.password) update['password'] = req.body.password;
    if (req.body.name) update['name'] = req.body.name;
    if (req.body.email) update['email'] = req.body.email;

    await User.findByIdAndUpdate(req.user._id, update);
    res.send('OK');
  } catch (error) {
    let errorResponse = new ErrorResponse();

    if (error instanceof InvalidTokenIdError) {
      errorRespsonse.add('token', error.message);
    }

    if (error instanceof PasswordIncorrectError) {
      errorResponse.add('password', error.message);
    }

    if (error instanceof EmailReservedError) {
      errorResponse.add('email', error.message);
    }
    
    errorResponse.addAll(getJoiValidationErrors(error));

    if (errorResponse.hasEntries()) {
      res.status(422).send(errorResponse.compile());
    } else {
      console.log(error);
      res.status(500).send(ErrorResponse.default());
    }
  }
});

module.exports = router;
