const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Replace with your actual secret key

const { fetchReviews, createReview, editReview, deleteReview } = require("../db");

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ status: 'error', message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey); // Assuming the token is in the format "Bearer <token>"
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
};

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    res.send(await fetchReviews());
  } catch (ex) {
    next(ex);
  }
});

router.post("/create", authMiddleware, async (req, res, next) => {
  try {
    res.send(await createReview(req.body));
  } catch (ex) {
    next(ex); 
  }
});

router.put("/:review_id", authMiddleware, async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { description, rating } = req.body;
    
    const updatedReview = await editReview({ review_id, description, rating });
    res.send(updatedReview);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:review_id", authMiddleware, async (req, res, next) => {
  try {
    const { review_id } = req.params;
    
    const deletedReview = await deleteReview(review_id);
    res.send(deletedReview);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;