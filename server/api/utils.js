const jwt = require('jsonwebtoken');
const { findUserWithToken } = require('../db/user');

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Authorization token required' });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ status: 'error', message: 'Invalid token' });
  }
};

module.exports = { isLoggedIn };
