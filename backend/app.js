require("dotenv").config(); // Load environment variables
const express = require("express");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const { startCron } = require("./utils/cronJob");

const app = express();
const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());

// Auth Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// Database Connection
connectDB();

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});
// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
