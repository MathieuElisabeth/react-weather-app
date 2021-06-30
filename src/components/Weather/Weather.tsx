import React from 'react';
import './Weather.css';

type Props = {
  name: string,
  temp: number,
  icon: string,
  previous: any
};

const Weather: React.FC<Props> = ({ name, temp, icon, previous }: Props) => {
  return (
    <div className="weather-container">
      <button
        className="prev-btn"
        onClick={previous}
      >
        ➜
      </button>
      <div className="weather-card">
        <img
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="weather status icon"
          className="weather-icon"
        />
        <h1>{Math.floor(temp)}&deg; C</h1>

        <h2>{name}</h2>
        <p>
          {Math.floor(temp) < 15 ?
            "Il fait froid"
            :
            "Il fait chaud"
          }
        </p>
      </div>
    </div>
  )
}

export default Weather
