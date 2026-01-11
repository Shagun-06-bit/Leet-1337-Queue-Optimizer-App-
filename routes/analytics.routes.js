const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const { getQueueAnalytics } = require("../controllers/analytics.controller");

router.get(
  "/queue/:queueId",
  authMiddleware,
  authorizeRoles("ADMIN", "STAFF"),
  getQueueAnalytics
);

module.exports = router;
