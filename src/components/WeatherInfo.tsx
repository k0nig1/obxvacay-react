import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonItem, IonLabel } from '@ionic/react';
import axios from 'axios';

interface WeatherInfoProps {
  location: string; // Accept location as a prop
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_KEY = '332a43bda5e94a5a9e1121157241609'; // Replace with your WeatherAPI key

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]); // Trigger fetch whenever location changes

  if (loading) {
    return <IonSpinner />;
  }

  if (!weatherData) {
    return <div>Error loading weather data.</div>;
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Current Weather in {weatherData.location.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel>
            <h2>Temperature: {weatherData.current.temp_f}°F</h2>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Feels Like: {weatherData.current.feelslike_f}°F</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind: {weatherData.current.wind_mph} mph</p>
          </IonLabel>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default WeatherInfo;