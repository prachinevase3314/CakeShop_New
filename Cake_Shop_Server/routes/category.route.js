const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createCategory);
router.patch("/:id", authMiddleware, updateCategory);
router.get("/", authMiddleware, getCategories);
router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;
