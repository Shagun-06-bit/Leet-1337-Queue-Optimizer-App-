const mongoose = require("mongoose");
const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");

exports.getQueueAnalytics = async (req, res) => {
  try {
    const { queueId } = req.params;
    const businessId = req.user.businessId;

    if (!mongoose.Types.ObjectId.isValid(queueId)) {
      return res.status(404).json({ message: "Queue not found" });
    }

    const queue = await Queue.findOne({
      _id: queueId,
      businessId
    });

    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

const totalTokensGenerated = await QueueEntry.countDocuments({
  queueId: queue._id,
  businessId: businessId
});
const waitingCount = await QueueEntry.countDocuments({
  queueId: queue._id,
  businessId: businessId,
  status: "waiting"
});
const servingCount = await QueueEntry.countDocuments({
  queueId: queue._id,
  businessId: businessId,
  status: "serving"
});
const completedCount = await QueueEntry.countDocuments({
  queueId: queue._id,
  businessId: businessId,
  status: "completed"
});
const queueLoad = waitingCount + servingCount;

    const currentServing = await QueueEntry.findOne({
    queueId: queue._id,
    businessId: businessId,
    status: "serving"
    }).select("tokenNumber createdAt");


    const currentServingToken = currentServing
    ? {
        tokenNumber: currentServing.tokenNumber,
        startedAt: currentServing.createdAt
        }
    : null;
const recentCompletedTokens = await QueueEntry.find({
  queueId: queue._id,
  businessId: businessId,
  status: "completed"
})
  .sort({ updatedAt: -1 })
  .limit(10)
  .select("createdAt updatedAt");
let averageServiceTimeMinutes = null;

if (recentCompletedTokens.length > 0) {
  const totalTimeMs = recentCompletedTokens.reduce((sum, token) => {
    return sum + (token.updatedAt - token.createdAt);
  }, 0);

  averageServiceTimeMinutes = Math.round(
    totalTimeMs / recentCompletedTokens.length / 60000
  );
}

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const todayTokensGenerated = await QueueEntry.countDocuments({
  queueId: queue._id,
  businessId: businessId,
  createdAt: { $gte: startOfToday }
});

const todayTokensCompleted = await QueueEntry.countDocuments({
  queueId: queue._id,
  businessId: businessId,
  status: "completed",
  updatedAt: { $gte: startOfToday }
});



    res.json({
  queueId: queue._id,
  queueName: queue.name,
  tokens: {
    totalGenerated: totalTokensGenerated,
    waiting: waitingCount,
    serving: servingCount,
    completed: completedCount
  },
  queueLoad,
  currentServing: currentServingToken,
  averageServiceTimeMinutes,
  today: {
    tokensGenerated: todayTokensGenerated,
    tokensCompleted: todayTokensCompleted
  }
  
});


  } catch (error) {
    console.error("ANALYTICS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
