const express = require("express");
const {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.patch("/:id", authMiddleware, updateProduct);
router.get("/", authMiddleware, getProducts);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
