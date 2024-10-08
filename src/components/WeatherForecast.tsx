import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSpinner } from '@ionic/react';
import axios from 'axios';
import './WeatherForecast.css'; // Import CSS file for custom styles

interface WeatherForecastProps {
  location: string; // Accept the location as a prop
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ location }) => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({}); // Track errors for each day

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
  }, [location]);

  if (loading) {
    return <IonSpinner />;
  }

  if (!forecastData) {
    return <div>Error loading forecast data.</div>;
  }

  // Get the current hour to decide whether to emphasize the high or low temperature
  const currentHour = new Date().getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18; // Daytime between 6am and 6pm

  // Get all three days of weather including today
  const forecastDays = forecastData.forecast.forecastday;

  // Function to handle image load error for each day
  const handleImageError = (index: number) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [index]: true, // Mark error for the specific day
    }));
  };

  return (
    <IonCard className="ion-no-margin ion-no-padding">
      <IonCardContent className="ion-no-margin ion-no-padding">
        <IonGrid className="ion-no-margin ion-no-padding">
          <IonRow className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center weather-row">
            {forecastDays.map((day: any, index: number) => {
              const dayName = index === 0
                ? "Today"
                : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });

              // Ensure HTTPS is used for the weather icon
                const iconUrl = day.day.condition.icon.startsWith('//') || day.day.condition.icon.startsWith('http')
                ? `https:${day.day.condition.icon.replace(/^\/\//, '')}` // If the URL starts with "//" or "http", ensure it uses "https:"
                : day.day.condition.icon;

              return (
                <IonCol size="auto" key={index} className="ion-no-margin ion-no-padding">
                  <IonItem className="forecast-item ion-no-margin ion-no-padding" lines="none">
                    <IonLabel className="forecast-label">
                      <h2 className="day-name">{dayName}</h2>
                      {/* If the image fails to load, show the condition text */}
                      {imageErrors[index] ? (
                        <p className="weather-condition-text">{day.day.condition.text}</p>
                      ) : (
                        <img
                          src={iconUrl} // Use the modified URL
                          alt="weather icon"
                          className="weather-icon"
                          onError={() => handleImageError(index)} // Handle image load error for this day
                        />
                      )}
                      <div className="temp-container">
                        <span className={`temp-high ${isDaytime ? 'bold-large' : ''}`}>
                          {day.day.maxtemp_f}°F
                        </span>
                        <span className="temp-separator">&nbsp;&nbsp;</span>
                        <span className={`temp-low ${!isDaytime ? 'bold-large' : ''}`}>
                          {day.day.mintemp_f}°F
                        </span>
                      </div>
                      <p className="rain-chance">Rain: {day.day.daily_chance_of_rain}%</p>
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