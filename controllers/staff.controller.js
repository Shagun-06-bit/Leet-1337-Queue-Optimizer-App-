const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");

exports.createStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const staff = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "STAFF",
      businessId: req.user.businessId, 
    });

    res.status(201).json({
      message: "Staff created successfully",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.serveNextToken = async (req, res) => {
  try {
    const { queueId } = req.params;


const queue = await Queue.findOne({
  _id: queueId,
  businessId: req.user.businessId,
});

if (!queue) {
  return res.status(404).json({
    message: "Queue not found or access denied",
  });
}


    
    const currentServing = await QueueEntry.findOne({
      queueId,
      status: "serving",
    });

    if (currentServing) {
      currentServing.status = "completed";
      await currentServing.save();
    }

    
    const nextEntry = await QueueEntry.findOne({
      queueId,
      status: "waiting",
    }).sort({ tokenNumber: 1 });

    
    if (!nextEntry) {
      return res.json({
        message: "No more tokens in queue",
        currentServing: null,
      });
    }

    
    nextEntry.status = "serving";
    await nextEntry.save();

    
    return res.json({
      message: "Next token is now serving",
      currentServing: nextEntry.tokenNumber,
      queueEntryId: nextEntry._id,
    });
  } catch (error) {
    console.error("Serve Next Token Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
