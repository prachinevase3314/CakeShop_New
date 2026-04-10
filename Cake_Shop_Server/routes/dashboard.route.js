const express = require("express");
const { getDashboardStats } = require("../controllers/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/stats", authMiddleware, getDashboardStats);

module.exports = router;
