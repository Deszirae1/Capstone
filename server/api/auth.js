const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("./utils");
const { authenticate, createUser, findUserWithToken } = require("../db");

//Testing the route
router.get("/", (req, res) => {
  res.send("hello from auth");
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await authenticate(req.body);

    if (user) {
      // Successful auth 
      const token = createToken(user);
      return res.status(200).json({ message: "Login successful", token });
    } else {
      // Failed auth
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    
    console.error(error); 
    return next(error);
  }
});


router.post("/register", async (req, res, next) => {
  try {

    const user = await createUser(req.body);
    

    const token = createToken(user); 
    return res.status(201).json({ message: "You've been successfully registered", token });
  } catch (error) {
    console.error(error); 
    return next(error); 
  }
});


router.get("/me", isLoggedIn, (req, res, next) => {
  if (req.user) {
    res.status(200).json({ user: req.user });

  } else {
    res.status(404).json({ message: "User not found" });
  }
});


module.exports = router;
