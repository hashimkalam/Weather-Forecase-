import { useState } from "react";
import "./App.css";
import { Button } from "@mui/material";

const api = {
  key: "304397386ae4bb177ef121ce4ecb06fb",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = (e) => {
    e.preventDefault();

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`).then(
      (res) =>
        res
          .json()
          .then((result) => {
            setWeather(result);
            console.log(result);
          })
          .catch((error) => {
            console.log("Error fetching the weather data: ", error);
          })
    );
  };
  return (
    <div className="app">
      <div className="app__container">
        <h1> Weather App </h1>
        <form className="app__container-input" onSubmit={searchPressed}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Enter City/Town..."
          />
          <Button type="submit">Search</Button>
        </form>

        {weather.name && (
          <div className="app__weather-details">
            <p>
              <span>City:</span> {weather.name}
            </p>
            <p>
              <span>Temperature:</span> {weather.main.temp}°C
            </p>
            <p>
              <span>Weather:</span> {weather.weather[0].main}
            </p>
            <p>
              <span>Description:</span> {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
