import React, { useState } from 'react'

const api = {
  key: "5f0635dfb81c86bea14d16be8810be5c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Content() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = String(new window.Date())
    date = date.slice(3, 15)

    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
      <main>
        <div className="search-area">
          <input type="text" className="search" placeholder="Search..."
            onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>

        <p>Try searching any city around the world and get the weather. Also note that if there are cities that have the same name, please specify the country. <br/> <br/>For example, Melbourne, Australia. (The other Melbourne is in the United States.)</p>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-container">
              <div className="location">{weather.name}, {weather.sys.country} </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
  );
}

export default Content
