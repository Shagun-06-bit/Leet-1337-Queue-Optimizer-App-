const express = require("express");
const router = express.Router();

const { joinQueue, getTokenStatus } = require("../controllers/public.controller");


router.post("/queues/:queueId/join", joinQueue);


router.get("/queue/status", getTokenStatus);

module.exports = router;
