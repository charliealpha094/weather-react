import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=86cba16ebbfafe24924b12ecc6cfa031`;

  const searchCity = (e) => {
    // Triggered by pressing enter key
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        //console.log(response.data);
      });
      setLocation("");
    }
  };

  const handleSubmit = () => {
    // searchCity();
    axios.get(url).then((response) => {
      setData(response.data);
    });
    setLocation("");
  };

  const iconcode = data.main ? data.weather[0].icon : null;

  const date = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchCity}
          placeholder="Enter city name"
          type="text"
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="date">
            {days[date.getDay()]}, {month[date.getMonth()]} {date.getDate()},{" "}
            {date.getFullYear()}{" "}
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp}ºC</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <img
          className="icon"
          src={`http://openweathermap.org/img/w/${iconcode}.png`}
          alt=""
        />

        {data.name != undefined && (
          <div className="bottom">
            <div className="wind">
              {data.main ? (
                <p className="bold">{data.wind.speed} Km/h</p>
              ) : null}
              <p>Wind speed</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like} ºC</p>
              ) : null}
              <p>Feels like</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
