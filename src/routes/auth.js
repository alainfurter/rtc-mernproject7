const express = require("express");
const router = express.Router();
const { hasValidJWTToken } = require("../middlewares/authentication");
const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/usersController");

const uploadFile = require("../middlewares/uploadFile");
const { updateUserAvatarDB } = require("../repositories/usersFunctions");

router.get("/", hasValidJWTToken, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

// POST http://localhost:4001/auth/upload-avatar
router.post(
  "/upload-avatar",
  hasValidJWTToken,
  uploadFile.single("avatar"),
  async (req, res, next) => {
    //console.log(req.file);
    //console.log("User: ", req.user);
    const { path } = req.file; // upload functions sends back path on cloudinary
    const { id } = req.user; // the hasValidJWTToken function added the user object before to the req
    await updateUserAvatarDB(id, path);
    res.status(201).json({ data: "Sucess!" });
  }
);

module.exports = router;
