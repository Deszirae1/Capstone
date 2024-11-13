const express = require("express");
const router = express.Router();
const { fetchUsers, getUsersReviews, getUsersWithReviewSummary, deleteUser } = require("../db");
const { isLoggedIn } = require("./utils");

router.get("/", async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.send(users);
  } catch (ex) {
    console.error("ERROR fetching users:", ex); 
    next(ex); 
  }
});

router.get("/UsersWithReviewSummary", async (req, res, next) => {
  try {
    const usersWithSummary = await getUsersWithReviewSummary();
    res.send(usersWithSummary);
  } catch (ex) {
    console.error("ERROR fetching users with review summaries:", ex); 
    next(ex);
  }
});

router.get("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id;
    const reviews = await getUsersReviews(id);
    if (!reviews) {
      return res.status(404).json({ message: "No reviews found for this user" });
    }
    res.send(reviews);
  } catch (ex) {
    console.error("ERROR fetching reviews:", ex);
    next(ex);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  const userId = req.params.id;

  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User NOT found" });
    }
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("ERROR deleting user:", error); 
    res.status(error.status || 500).json({ message: error.message });
    next(error);
  }
});

module.exports = router;
