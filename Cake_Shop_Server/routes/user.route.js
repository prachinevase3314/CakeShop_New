const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  getAllUsers,
  resetPassword,
  addToCart,
  removeFromCart,
  getCart,
  updateCartItem,
  clearCart,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password-reset", resetPassword);
router.put("/:user_Id", authMiddleware, updateUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/all", getAllUsers);

// Cart Routes
router.post("/cart/add", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getCart);
router.put("/cart/update", authMiddleware, updateCartItem);
router.delete("/cart/remove/:productId", authMiddleware, removeFromCart);
router.delete("/cart/clear", authMiddleware, clearCart);

module.exports = router;
