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

module.exports = router;
