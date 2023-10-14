const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookWithPublisherForId,
  addPublisherIDToBookWithId,
  addBookImagePathToBookWithId,
} = require("../controllers/booksController");

const {
  isAuthenticated,
  hasValidJWTToken,
} = require("../middlewares/authentication");

const uploadFile = require("../middlewares/uploadFile");
const {
  addBookImagePathToBookWithIdDB,
} = require("../repositories/booksFunctions");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/withpublisher/:id", getBookWithPublisherForId);
router.post("/", hasValidJWTToken, createBook);
router.put("/:id", hasValidJWTToken, updateBook);
router.put("/addpublisher/:id", hasValidJWTToken, addPublisherIDToBookWithId);
router.delete("/:id", hasValidJWTToken, deleteBook);

// POST http://localhost:4001/books/addcover/:id
router.post(
  "/addcover/:id",
  hasValidJWTToken,
  uploadFile.single("cover"),
  async (req, res, next) => {
    const { id } = req.params;
    const { path } = req.file; // upload functions sends back path on cloudinary
    await addBookImagePathToBookWithIdDB(id, path);
    res.status(201).json({ data: "Sucess!" });
  }
);

module.exports = router;
