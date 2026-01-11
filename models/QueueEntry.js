const mongoose = require("mongoose");

const queueEntrySchema = new mongoose.Schema(
  {
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    tokenNumber: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["waiting", "serving", "completed", "cancelled"],
      default: "waiting",
    },
  },
  {
    timestamps: true, // gives createdAt = joined time
  }
);

module.exports = mongoose.model("QueueEntry", queueEntrySchema);
