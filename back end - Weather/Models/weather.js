// models/weather.js
const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;
