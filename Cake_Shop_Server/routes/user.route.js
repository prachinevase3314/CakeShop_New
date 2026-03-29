const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  getAllUsers,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/:user_Id", authMiddleware, updateUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/all", authMiddleware, getAllUsers);

module.exports = router;
