const express = require("express");
const router = express.Router();

const {
  getAllPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
  getAllBooksForPublisherWithId,
  addBookIDToPublisherWithId,
} = require("../controllers/publishersController");

const {
  isAuthenticated,
  hasValidJWTToken,
} = require("../middlewares/authentication");

router.get("/", getAllPublishers);
router.get("/:id", getPublisherById);
router.get("/withbooks/:id", getAllBooksForPublisherWithId);
router.post("/", hasValidJWTToken, createPublisher);
router.put("/:id", hasValidJWTToken, updatePublisher);
router.put("/addbook/:id", hasValidJWTToken, addBookIDToPublisherWithId);
router.delete("/:id", hasValidJWTToken, deletePublisher);

module.exports = router;
