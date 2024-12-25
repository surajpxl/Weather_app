import React, { useEffect, useRef, useState } from "react";
import clear_icon from "../assets/clear.png"; // Corrected path
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import search_icon from "../assets/search.png";


const Weather = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState(null);

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const fetchWeather = async (city) => {
    if (!city) return alert("Enter a city name!");

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) return alert(data.message);

      setWeather({
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        location: data.name,
        icon: weatherIcons[data.weather[0].icon] || clear_icon,
      });
    } catch {
      alert("Error fetching weather data!");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather("Delhi");
  }, []);

  return (
    <div className="min-h-screen grid place-items-center bg-[#88a7a2]"
    style={{
        fontFamily: "'Poppins', sans-serif",
      }}
      >
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full transition hover:scale-105">
        <div className="flex items-center gap-4 mb-6">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search city..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <img
            src={search_icon}
            alt="Search"
            className="w-10 h-10 cursor-pointer"
            onClick={() => fetchWeather(inputRef.current.value)}
          />
        </div>

        {weather && (
          <div className="text-center">
            <img
              src={weather.icon}
              alt="Weather Icon"
              className="w-24 mx-auto mb-4 animate-bounce"
            />
            <p className="text-5xl font-bold text-gray-800 mb-2">
              {weather.temperature}°C
            </p>
            <p className="text-2xl text-gray-700">{weather.location}</p>
            <div className="flex justify-between mt-6 text-gray-600 text-lg">
              <div className="flex items-center gap-2 bg-slate-500 rounded-sm">
                <img className="w-6 " src={humidity_icon} alt="Humidity" />
                <p className="text-white ">{weather.humidity}%</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-500 rounded sm">
                <img src={wind_icon} alt="Wind Speed" className="w-6" />
                <p className="text-white">{weather.windSpeed} Km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
