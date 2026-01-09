import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";

export default function InfoBox({ info }) {
    if (!info) {
        return null;
    }

    // Image URLs for different weather conditions
    const getWeatherImage = (weatherMain, temp) => {
        const weatherLower = weatherMain.toLowerCase();
        
        if (weatherLower.includes('rain') || weatherLower.includes('drizzle') || weatherLower.includes('thunderstorm')) {
            return "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0";
        } else if (weatherLower.includes('snow')) {
            return "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1052&auto=format&fit=crop&ixlib=rb-4.1.0";
        } else if (weatherLower.includes('cloud')) {
            return "https://images.unsplash.com/photo-1517685737003-4b7f1af0e82e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0";
        } else if (temp >= 25) {
            return "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0";
        } else if (temp < 10) {
            return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0";
        } else {
            return "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0";
        }
    };

    const imageUrl = getWeatherImage(info.weatherMain || info.weather, info.temp);

    return (
        <div className="InfoBox">
            <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "20px" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={info.weather}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="city-name">
                        {info.city}, {info.country}
                    </Typography>

                    <Typography variant="h6" component="div" className="temperature">
                        {Math.round(info.temp)}°C
                    </Typography>

                    <Typography variant="body2" color="text.secondary" component={"div"} className="weather-description">
                        {info.weather.charAt(0).toUpperCase() + info.weather.slice(1)}
                    </Typography>

                    <div className="weather-details">
                        <Typography variant="body2" color="text.secondary" component={"div"}>
                            <p><strong>Feels Like:</strong> {Math.round(info.feelsLike)}°C</p>
                            <p><strong>Min Temp:</strong> {Math.round(info.tempMin)}°C</p>
                            <p><strong>Max Temp:</strong> {Math.round(info.tempMax)}°C</p>
                            <p><strong>Humidity:</strong> {info.humidity}%</p>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
