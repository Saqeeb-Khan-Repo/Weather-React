import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ErrorDisplay from "./components/ErrorDisplay";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeatherData = async (cityName) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    }

    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Teller</h1>

      <form className="wheatherForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          className="inputDisplay"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </form>

      {error && <ErrorDisplay message={error} />}
      {weatherData && <WeatherCard data={weatherData} />}
      {!weatherData && !error && (
        <div className="card" style={{ display: "none" }}></div>
      )}
    </div>
  );
};

export default App;
