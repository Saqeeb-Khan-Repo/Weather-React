import React from "react";
import { getWeatherEmoji, getWindDirection, celsiusConverter } from "../utils";

const WeatherCard = ({ data }) => {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
    wind: { deg, gust, speed },
  } = data;

  const gustKmh = gust ? (gust * 3.6).toFixed(1) : "N/A";

  return (
    <div className="card" style={{ display: "flex" }}>
      <h1 className="cityDisplay">{city}</h1>
      <p className="emojiDisplay">{getWeatherEmoji(id)}</p>
      <p className="tempDisplay">{celsiusConverter(temp)}℃</p>
      <p className="stateDisplay">{description}</p>
      <p className="humidityDisplay">Humidity: {humidity}%</p>
      <div className="wind-info">
        <p className="stateDisplay">
          WIND: {deg}° ({getWindDirection(deg)})
        </p>
        <p className="stateDisplay">
          Gust: {gust || "N/A"} m/s ({gustKmh} km/h)
        </p>
        <p className="stateDisplay">Speed: {speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
