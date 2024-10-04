import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
} from "@ionic/react";
import LivestreamReactPlayer from "../components/LivestreamReactPlayer";
import { AdCard, VideoCard, LinkCard } from "../components/CardComponents";
import WeatherInfo from "../components/WeatherInfo"; // Import the WeatherInfo component
import WeatherForecast from "../components/WeatherForecast";

const Homepage: React.FC = () => {
  const [location, setLocation] = useState<string>("Kill Devil Hills, NC"); // Default location
  const [searchTerm, setSearchTerm] = useState<string>(""); // To store user input

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setLocation(searchTerm); // Update location when user clicks search
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Homepage</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid fixed>
          {/* Livestream Player at the Top */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard>
                <IonCardContent>
                  <LivestreamReactPlayer />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;