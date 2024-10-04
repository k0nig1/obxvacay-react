import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LivestreamReactPlayer from "../components/LivestreamReactPlayer";
import SocialMediaIcons from "../components/SocialMediaIcons";

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
          <IonTitle>OBX Vacay</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard>
                <IonCardContent>
                  <LivestreamReactPlayer />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard>
                <IonCardContent>
                  <h2>Check Out Our Website at</h2>
                  <a href="https://obxvacay.com">OBXVacay.com</a>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard>
                <IonCardContent>
                  <h2>Follow Us On Social Media</h2>
                  <SocialMediaIcons />
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
