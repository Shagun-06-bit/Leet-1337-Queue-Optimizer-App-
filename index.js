require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");



const app = express();


connectDB();

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const staffRoutes = require("./routes/staff.routes");
const queueRoutes = require("./routes/queue.routes");
const analyticsRoutes = require("./routes/analytics.routes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/public", require("./routes/public.routes"));
app.use("/api/analytics", analyticsRoutes);



app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
