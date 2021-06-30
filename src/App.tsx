import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar'
import WeatherCity from './components/Weather/Weather'

interface WeatherData {
  weather: Weather[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  }
  name: string;
}

interface Weather {
  id: number;
  main: string;
  icon: string;
}

const App = () => {
  const [apiData, setApiData] = useState<WeatherData>({
    weather: [{
      id: 0,
      main: "",
      icon: ""
    }],
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    },
    name: ""
  });
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setisLoading(false), 1000);
  });

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data)
        if (data.cod === "404") {
          setError("Ville non trouvé : vérifiez l'orthographe ou réessayez en anglais");
        }
      });
    setError('')
  }, [apiUrl]);


  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCity(search);
    setSearch('');
  }

  const handlePreviousPage = () => {
    setCity('');
  }


  return (
    <>
      {isLoading ?
        <div className="spinner-container">
          <div className="spinner"><div></div><div></div><div></div><div></div></div>
        </div>
        :
        <div className={`App ${apiData.main && Math.floor(apiData.main.temp) < 15 ?
          'freeze' :
          apiData.main && Math.floor(apiData.main.temp) >= 15 ?
            'warm' :
            ''}`}
        >
          <div className="container">
            {apiData.main ? (
              <WeatherCity name={apiData.name} icon={apiData.weather[0].icon} temp={apiData.main.temp} previous={handlePreviousPage} />
            ) : (
              <SearchBar setSearch={setSearch} handleSearch={handleSearch} search={search} error={error} />
            )}
          </div>
        </div>
      }
    </>
  );
}

export default App;
