const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");


router.get(
  "/profile",
  protect,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin profile accessed",
      user: req.user,
    });
  }
);

module.exports = router;
