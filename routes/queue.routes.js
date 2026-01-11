const express = require("express");
const router = express.Router();

const {
  createQueue,
  getQueues,
  getQueueById,
} = require("../controllers/queue.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");


router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  createQueue
);


router.get(
  "/",
  authMiddleware,
  getQueues
);


router.get(
  "/:queueId",
  authMiddleware,
  getQueueById
);


module.exports = router;
