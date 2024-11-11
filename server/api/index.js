const express = require("express");
const router = express.Router();



router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/business", require("./businesses"));
router.use("/reviews", require("./reviews"));


module.exports = router;
