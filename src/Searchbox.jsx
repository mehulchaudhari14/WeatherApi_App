import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Searchbox.css";
import { useState } from 'react';

export default function Searchbox({ onWeatherUpdate, onError, onLoading }) {
    let [city, setCity] = useState("");

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "6b2a15288d528b894d6d6ce7ec57ea38";

    let getWeatherInfo = async () => {
        if (!city.trim()) {
            onError("Please enter a city name");
            return;
        }

        onLoading(true);
        try {
            let response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found. Please check the spelling and try again.");
                } else if (response.status === 401) {
                    throw new Error("Invalid API key. Please check the configuration.");
                } else {
                    throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
                }
            }

            let jsonResponse = await response.json();
            console.log(jsonResponse);
            
            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                feelsLike: jsonResponse.main.feels_like,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                weather: jsonResponse.weather[0].description,
                weatherMain: jsonResponse.weather[0].main,
                country: jsonResponse.sys.country
            };

            console.log(result);
            onWeatherUpdate(result);
        } catch (err) {
            console.error("Error fetching weather:", err);
            onError(err.message || "An error occurred while fetching weather data");
        } finally {
            onLoading(false);
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = (evt) => {
        evt.preventDefault();
        getWeatherInfo();
        setCity("");
    };

    return (
        <div className="Searchbox">
            <h3>Search for the weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}
