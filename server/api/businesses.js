const express = require("express");
const router = express.Router();

const { fetchBusinesses, createBusiness, fetchBusiness, getBusinessReviews } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    // Improved validation for ID
    if (!id || id.trim() === "") {
      next({
        name: "MissingBusinessID",
        message: "A business ID must be provided",
      });
      return;
    }

    const result = await fetchBusiness(id);
    if (!result) {
      next({ name: "Not Found", message: "No matching business found" });
      return;
    }

    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id;

    // Improved validation for ID
    if (!id || id.trim() === "") {
      next({
        name: "MissingBusinessID",
        message: "A business ID must be provided",
      });
      return;
    }

    const result = await getBusinessReviews(id);
    if (!result) {
      next({ name: "Not Found", message: "No matching business found" });
      return;
    }

    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  const { name, description } = req.body;

  // Validate input fields for POST
  if (!name || !description) {
    next({
      name: "BadRequest",
      message: "Business name and description are required",
    });
    return;
  }

  try {
    const newBusiness = await createBusiness(req.body);
    res.status(201).send(newBusiness);  // Respond with 201 for created resource
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
