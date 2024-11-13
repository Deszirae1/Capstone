const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


const { isLoggedIn } = require("./utils");
const { authenticate, createUser, findUserWithToken } = require("../db");


router.get("/", (req, res) => {
  res.send("Hello from auth file api");
});


router.post("/login", async (req, res, next) => {
  try {
    
    const user = await authenticate(req.body);
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    
    res.json({
      status: 'success',
      data: {
        token: user.token,
        user: user.user,
      }
    });
  } catch (ex) {
    console.error('Error during login:', ex);
    next(ex);
  }
});


router.post("/register", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    if (!user) {
      return res.status(400).json({ status: 'error', message: 'User registration failed' });
    }
    const token = await authenticate(user); // Ensure this line works as expected
    res.json({ status: 'success', data: { token, user } });
  } catch (ex) {
    console.error('Error during registration:', ex);
    next(ex);
  }
});


router.get("/me", isLoggedIn, (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: req.user, 
    });
  } catch (ex) {
    console.error('Error fetching user data:', ex);
    next(ex);
  }
});

module.exports = router;
