const Queue = require("../models/Queue");


const createQueue = async (req, res) => {
  try {
    const { name } = req.body;

    
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Queue name is required",
      });
    }

    
    const businessId = req.user.businessId;

    const queue = await Queue.create({
      name,
      businessId,
    });

    return res.status(201).json({
      success: true,
      message: "Queue created successfully",
      data: queue,
    });
  } catch (error) {
    console.error("Create Queue Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating queue",
    });
  }
};


const getQueues = async (req, res) => {
  try {
    
    const businessId = req.user.businessId;

    const queues = await Queue.find({ businessId });

    return res.status(200).json({
      success: true,
      count: queues.length,
      data: queues,
    });
  } catch (error) {
    console.error("Get Queues Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching queues",
    });
  }
};

const getQueueById = async (req, res) => {
  try {
    const { queueId } = req.params;
    const { businessId } = req.user;

    const queue = await Queue.findOne({
      _id: queueId,
      businessId: businessId
    });

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found"
      });
    }

    res.status(200).json({
      success: true,
      data: queue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch queue",
      error: error.message
    });
  }
};


module.exports = {
  createQueue,
  getQueues,
  getQueueById,
};
