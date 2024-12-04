// config/db.js
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

// MongoDB connection URL from .env file
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    if (!MONGODB_URL) {
      console.error('MongoDB URL is not defined!');
      process.exit(1);  // Exit if MongoDB URL is missing
    }

    // Connect to MongoDB without deprecated options
    await mongoose.connect(MONGODB_URL);

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if MongoDB connection fails
  }
};

module.exports = connectDB;
