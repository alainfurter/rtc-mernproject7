const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the books database");
});

router.use("*", (req, res) => {
  res.status(404).send("404 Page not found");
});

router.use((error, req, res, next) => {
  res.status(500).json({ data: "Internal server error" });
});

module.exports = router;
