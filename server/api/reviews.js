const express = require("express");
const router = express.Router();

const { fetchReview, createReview, editReview, deleteReview } = require("../db");
const { isLoggedIn } = require("./utils");


router.get("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getUsersReviews(id);
    res.send(result);
  } catch (ex) {
    next(ex);
  }
});


router.post("/create", async (req, res, next) => {
  try {
    res.send(await createReview(req.body));
  } catch (ex) {
      next(ex); 
  }
});


router.put("/:review_id", async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { description, rating } = req.body;
    
    const updatedReview = await editReview({ review_id, description, rating });
    res.send(updatedReview);
  } catch (ex) {
    next(ex);
  }
});


router.delete("/:review_id", async (req, res, next) => {
  try {
    const { review_id } = req.params;
    
    const deletedReview = await deleteReview(review_id);
    res.send(deletedReview);
  } catch (ex) {
    next(ex);
  }
});





module.exports = router;