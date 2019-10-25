const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('auth-token');

  if (!token) {
    res.status(401).send('Token required');
  } else {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send('Token invalid');
    }
  }
}

module.exports = {
  verifyToken
}