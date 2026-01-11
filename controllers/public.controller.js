const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");


exports.joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;

    if (!queueId) {
      return res.status(400).json({
        message: "queueId is required"
      });
    }


    
    const queue = await Queue.findById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    
    if (queue.isActive === false) {
      return res.status(400).json({ message: "Queue is not active" });
    }

    
    const lastEntry = await QueueEntry.findOne({ queueId })
      .sort({ tokenNumber: -1 })
      .select("tokenNumber");

    const nextToken = lastEntry ? lastEntry.tokenNumber + 1 : 1;

    
    const entry = await QueueEntry.create({
      queueId,
      businessId: queue.businessId,
      tokenNumber: nextToken,
      status: "waiting",
    });

    
    const servingEntry = await QueueEntry.findOne({
      queueId,
      status: "serving",
    }).sort({ tokenNumber: 1 });

    const currentServing = servingEntry
      ? servingEntry.tokenNumber
      : null;

    
    const peopleAhead = await QueueEntry.countDocuments({
      queueId,
      status: "waiting",
      tokenNumber: { $lt: nextToken },
    });

    
    return res.status(201).json({
      queueId,
      tokenNumber: entry.tokenNumber,
      currentServing,
      peopleAhead,
      message: "Joined queue successfully",
    });
  } catch (error) {
    console.error("Join Queue Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTokenStatus = async (req, res) => {
  try {
    const { queueId, tokenNumber } = req.query;

    if (!queueId || !tokenNumber) {
      return res.status(400).json({
        message: "queueId and tokenNumber are required",
      });
    }
        
    const queue = await Queue.findById(queueId);

    if (!queue) {
    return res.status(404).json({
        message: "Queue not found",
    });
    }

    const queueStatus = queue.isActive ? "active" : "inactive";


    const myEntry = await QueueEntry.findOne({
      queueId,
      tokenNumber,
    });

    if (!myEntry) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    const servingEntry = await QueueEntry.findOne({
      queueId,
      status: "serving",
    });

    const currentServing = servingEntry
      ? servingEntry.tokenNumber
      : null;

    let peopleAhead = 0;

    if (myEntry.status === "waiting") {
      peopleAhead = await QueueEntry.countDocuments({
        queueId,
        status: "waiting",
        tokenNumber: { $lt: myEntry.tokenNumber },
      });
    }
    const ASSUMED_AVG_SERVICE_TIME = 2; // minutes (temporary heuristic)
    const estimatedWait = `${peopleAhead * ASSUMED_AVG_SERVICE_TIME} minutes`;



    return res.json({
      myToken: myEntry.tokenNumber,
      currentServing,
      status: myEntry.status,
      peopleAhead,
      queueStatus,
      estimatedWait,
    });
  } catch (error) {
    console.error("Get Token Status Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
