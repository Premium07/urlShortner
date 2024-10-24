// connectionDB.js
const mongoose = require("mongoose");

async function connectToDB(uri) {
  try {
    await mongoose.connect(uri);  // No need for useNewUrlParser and useUnifiedTopology
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if connection fails
  }
}

module.exports = { connectToDB };
