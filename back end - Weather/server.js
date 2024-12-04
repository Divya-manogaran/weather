require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// MongoDB connection and server setup
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
      console.log("MongoDB connected successfully!");
      app.listen(5000, () => {
          console.log("Server running on port 5000");
      });
  })
  .catch((err) => console.log(err));
