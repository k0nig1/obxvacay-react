import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSpinner } from '@ionic/react';
import axios from 'axios';
import './WeatherForecast.css'; // Import CSS file for custom styles

interface WeatherForecastProps {
  location: string; // Accept the location as a prop
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ location }) => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_KEY = '332a43bda5e94a5a9e1121157241609'; // Replace with your WeatherAPI key

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`
        );
        setForecastData(response.data);
      } catch (error) {
        console.error('Error fetching weather forecast data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [location]); // Fetch forecast whenever the location changes

  if (loading) {
    return <IonSpinner />;
  }

  if (!forecastData) {
    return <div>Error loading forecast data.</div>;
  }

  // Extract today's weather from the forecast data
  const todayWeather = forecastData.forecast.forecastday[0];

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Weather Forecast for {forecastData.location.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          {/* Today's Weather */}
          <IonRow className="ion-align-items-center ion-justify-content-center weather-row">
            <IonCol size="auto">
              <IonItem className="forecast-item today-weather" lines="none">
                <IonLabel className="forecast-label">
                  <h2 className="day-name">Today</h2>
                  <img src={todayWeather.day.condition.icon} alt="weather icon" className="weather-icon" />
                  <p className="condition-text">{todayWeather.day.condition.text}</p>
                  <p className="temp-text">{todayWeather.day.maxtemp_f}/{todayWeather.day.mintemp_f}°F</p>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          {/* 3-Day Forecast */}
          <IonRow className="ion-align-items-center ion-justify-content-center weather-row">
            {forecastData.forecast.forecastday.slice(1).map((day: any, index: number) => {
              const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });

              return (
                <IonCol size="auto" key={index}>
                  <IonItem className="forecast-item" lines="none">
                    <IonLabel className="forecast-label">
                      <h2 className="day-name">{dayName}</h2>
                      <img src={day.day.condition.icon} alt="weather icon" className="weather-icon" />
                      <p className="temp-text">{day.day.maxtemp_f}/{day.day.mintemp_f}°F</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default WeatherForecast;