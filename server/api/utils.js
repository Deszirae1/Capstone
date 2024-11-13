const jwt = require('jsonwebtoken');
const { findUserWithToken } = require('../db');

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Authorization token required' });
  }
  try {
    const user = await findUserWithToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn };
