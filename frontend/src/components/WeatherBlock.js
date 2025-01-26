import React from 'react';
import Weather from '../pages/Weather';
import CurrentWeather from './CurrentWeather';
import HourlyForecastWidget from './HourlyForecastWidget';
import Forecast from './Forecast';

const WeatherBlock = ({ block, onDelete, onSearchChange, showDeleteButton, forecastType,
  cityData, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  return (
    <div className={`weather-block ${isFavorite ? 'favorite' : ''}`} style={{
      marginBottom: '2rem',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      position: 'relative'

    }}>
      {showDeleteButton && (
        <><button
          onClick={() => onDelete(block.id)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '0',
            lineHeight: '1',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff6666'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
        >
          ×
        </button>
      </>)}
      <button 
        // onClick={() => cityData && cityData.name ? (isFavorite ? onRemoveFavorite(cityData.name) : onAddFavorite(cityData.name)) : null}
        onClick={() => isFavorite ? onRemoveFavorite(cityData.name) : onAddFavorite(cityData.name)}
        className="favorite-button"
      >
        {isFavorite ? '★' : '☆'}
      </button>

      
      <Weather onSearchChange={(data) => onSearchChange(data, block.id)} />
      { block.currentWeather && <CurrentWeather data={block.currentWeather} /> }
      {
        block.forecast && (
          <>
            <HourlyForecastWidget data={block.forecast} forecastType={forecastType} />
            <Forecast data={block.forecast} forecastType={forecastType} />
          </>
        )
      }
    </div>
  );
};

export default WeatherBlock;