import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSpinner,
} from "@ionic/react";
import axios from "axios";
import "./WeatherForecast.css"; // Import CSS file for custom styles

interface WeatherForecastProps {
  location: string; // Accept the location as a prop
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ location }) => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({}); // Track errors for each day

  const API_KEY = "332a43bda5e94a5a9e1121157241609";

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`
        );
        // console.log("API Forecast Data:", response.data); // Log the raw forecast data
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching weather forecast data", error);
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

  // Get the current hour in US East Coast time zone
  const currentHour = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    hour12: false,
  })
    .formatToParts(new Date())
    .find((part) => part.type === "hour")?.value;

  const isDaytime = Number(currentHour) >= 6 && Number(currentHour) < 18; // Daytime between 6am and 6pm

  // Get all three days of weather including today
  const forecastDays = forecastData.forecast.forecastday;

  const myTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // console.log(`Your current time zone is: ${myTimeZone}`);

  // forecastDays.map((day: any, index: number) => {
  //   const rawDate = new Date(day.date);
  //   const formattedDate = new Intl.DateTimeFormat("en-US", {
  //     weekday: "short",
  //     timeZone: myTimeZone,
  //   }).format(rawDate);
  //   console.log(`Day ${index}: ${formattedDate} (raw date: ${rawDate})`); // Log formatted and raw date
  // });

  // Function to format the day name based on the U.S. East Coast time zone
  const formatDay = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      timeZone: myTimeZone,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

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
              const dayName = index === 0 ? "Today" : formatDay(day.date);

              // Ensure HTTPS is used for the weather icon
              const iconUrl =
                day.day.condition.icon.startsWith("//") ||
                day.day.condition.icon.startsWith("http")
                  ? `https://${day.day.condition.icon.replace(/^\/\//, "")}` // If the URL starts with "//" or "http", ensure it uses "https:"
                  : day.day.condition.icon;

              return (
                <IonCol
                  size="auto"
                  key={index}
                  className="ion-no-margin ion-no-padding"
                >
                  <IonItem
                    className="forecast-item ion-no-margin ion-no-padding"
                    lines="none"
                  >
                    <IonLabel className="forecast-label">
                      <h2 className="day-name">{dayName}</h2>
                      {/* If the image fails to load, show the condition text */}
                      {imageErrors[index] ? (
                        <p className="weather-condition-text">
                          {day.day.condition.text}
                        </p>
                      ) : (
                        <img
                          src={iconUrl} // Use the modified URL
                          alt="weather icon"
                          className="weather-icon"
                          onError={() => handleImageError(index)} // Handle image load error for this day
                          onLoad={() => console.log("Icon URL " + iconUrl)}
                        />
                      )}
                      <div className="temp-container">
                        <span
                          className={`temp-high ${
                            isDaytime ? "bold-large" : ""
                          }`}
                        >
                          {Math.round(day.day.maxtemp_f)}
                        </span>
                        <span className="temp-separator">/</span>
                        <span
                          className={`temp-low ${
                            !isDaytime ? "bold-large" : ""
                          }`}
                        >
                          {Math.round(day.day.mintemp_f)}
                        </span>
                      </div>
                      <p className="rain-chance">
                        {day.day.daily_chance_of_rain}%
                      </p>
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
