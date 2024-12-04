// controllers/controller.js
const Weather = require('../models/weather'); // Correct path to your Weather model

// Handle POST request to create new weather data
exports.createWeatherData = async (req, res) => {
  try {
    const { temperature, city } = req.body; // Example data

    const newWeather = new Weather({
      temperature,
      city,
    });

    await newWeather.save();
    res.json({
      success: true,
      message: 'Weather data saved successfully',
      data: newWeather,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
