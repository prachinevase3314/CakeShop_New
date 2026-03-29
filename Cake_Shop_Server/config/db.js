const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Forces Google DNS

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGODB_ATLAS_URL || "";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
