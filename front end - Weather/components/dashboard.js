import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeather(res.data);
    } catch {
      setError('City not found');
    }
  };

  const addFavorite = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/cities/add`,
        { cityName: city },
        { headers: { Authorization: token } }
      );
      fetchFavorites();
    } catch {
      setError('Error adding favorite');
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cities`, {
        headers: { Authorization: token },
      });
      setFavorites(res.data);
    } catch {
      setError('Error fetching favorites');
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cities/${id}`, {
        headers: { Authorization: token },
      });
      fetchFavorites();
    } catch {
      setError('Error removing favorite');
    }
  };

  return (
    <div>
      <h2>Weather Dashboard</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Check Weather</button>
      <button onClick={addFavorite}>Add to Favorites</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>{(weather.main.temp - 273.15).toFixed(2)}°C</p>
        </div>
      )}
      <h3>Favorites</h3>
      <ul>
        {favorites.map((fav) => (
          <li key={fav._id}>
            {fav.cityName}
            <button onClick={() => removeFavorite(fav._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
