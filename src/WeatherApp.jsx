import { useState } from 'react';
import Searchbox from './Searchbox';
import InfoBox from './InfoBox';
import './WeatherApp.css';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleWeatherUpdate = (data) => {
        setWeatherInfo(data);
        setError(null);
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setWeatherInfo(null);
    };

    const handleLoading = (isLoading) => {
        setLoading(isLoading);
    };

    return (
        <div className="WeatherApp">
            <h1>Weather App</h1>
            <Searchbox 
                onWeatherUpdate={handleWeatherUpdate}
                onError={handleError}
                onLoading={handleLoading}
            />
            {loading && <div className="loading">Loading weather data...</div>}
            {error && <div className="error">{error}</div>}
            {weatherInfo && <InfoBox info={weatherInfo} />}
        </div>
    );
}

