import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSpinner } from '@ionic/react';
import axios from 'axios';

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

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>3-Day Forecast for {forecastData.location.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          {/* Single IonRow to display forecast items side by side */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            {forecastData.forecast.forecastday.map((day: any, index: number) => {
              // Get the day name from the date
              const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });

              return (
                  <IonItem lines="none">
                    <IonLabel>
                      <img src={day.day.condition.icon} alt="weather icon" />
                      <h2>{dayName}</h2> {/* Show the day name instead of the date */}
                      <p>{day.day.condition.text}</p>
                      <p>{day.day.maxtemp_f}/{day.day.mintemp_f}°F</p>
                    </IonLabel>
                  </IonItem>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default WeatherForecast;