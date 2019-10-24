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
    res.status(500).send({'error': error})
  }
});

module.exports = router;
