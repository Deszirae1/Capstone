const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./utils");

const { fetchBusinesses, createBusiness, fetchBusiness, getBusinessReviews } = require("../db");

// Helper function for validating business ID
const validateBusinessID = (id) => {
  return !id || id.trim() === "";
};

// GET all businesses
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const businesses = await fetchBusinesses();
    res.json(businesses);
  } catch (ex) {
    next(ex);
  }
});

// GET a single business by ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (validateBusinessID(id)) {
      return next({
        name: "MissingBusinessID",
        message: "A business ID must be provided",
      });
    }

    const business = await fetchBusiness(id);
    if (!business) {
      return next({ name: "Not Found", message: "No matching business found" });
    }

    res.json(business);
  } catch (ex) {
    next(ex);
  }
});

// GET reviews for a business by ID
router.get("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (validateBusinessID(id)) {
      return next({
        name: "MissingBusinessID",
        message: "A business ID must be provided",
      });
    }

    const reviews = await getBusinessReviews(id);
    if (!reviews) {
      return next({ name: "Not Found", message: "No matching business found" });
    }

    res.json(reviews);
  } catch (ex) {
    next(ex);
  }
});

// POST create a new business
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { businessname_full, street_address, city, state, zip, price_range } = req.body;

    // Validate the body (businessname_full, street_address, city, state, zip, price_range should not be empty)
    if (!businessname_full || !street_address || !city || !state || !zip || !price_range) {
      return next({
        name: "Request no good",
        message: "Full business name, street address, city, state, zip, and price range are required",
      });
    }

    const newBusiness = await createBusiness(req.body);
    res.status(201).json(newBusiness); // Status 201 for created resource
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;