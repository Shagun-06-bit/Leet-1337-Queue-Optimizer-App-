const express = require("express");
const router = express.Router();

const { joinQueue, getTokenStatus } = require("../controllers/public.controller");

router.post("/queues/join", joinQueue);

router.get("/queue/status", getTokenStatus);

module.exports = router;
