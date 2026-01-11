const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

const {
  createStaff,
  serveNextToken,
} = require("../controllers/staff.controller");


router.post(
  "/create",
  protect,
  authorizeRoles("ADMIN"),
  createStaff
);


router.post(
  "/queues/:queueId/serve-next",
  protect,
  authorizeRoles("STAFF", "ADMIN"),
  serveNextToken
);

module.exports = router;
