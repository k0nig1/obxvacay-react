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

          {/* Search Bar */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonItem>
                <IonInput
                  value={searchTerm}
                  placeholder="Enter location to see the weather"
                  onIonChange={(e) => setSearchTerm(e.detail.value!)}
                />
                <IonButton onClick={handleSearch}>Search</IonButton>
              </IonItem>
            </IonCol>
          </IonRow>

          {/* WeatherInfo Component */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <WeatherInfo location={location} /> {/* Pass location as prop */}
            </IonCol>
          </IonRow>

          {/* WeatherForecast Component */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <WeatherForecast location={location} /> {/* Pass location as prop */}
            </IonCol>
          </IonRow>

          {/* Cards in their own rows */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <LinkCard title="Login" name="Login Here" link="/login" />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <AdCard
                adText="Check out our latest product!"
                link="https://www.google.com"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <VideoCard
                videoTitle="Puppies open a cat store"
                videoUrl="https://example.com/video.mp4"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <VideoCard
                videoTitle="The world is getting smaller"
                videoUrl="https://example.com/video.mp4"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <VideoCard
                videoTitle="Dont forget to floss!"
                videoUrl="https://example.com/video.mp4"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <VideoCard
                videoTitle="How the OBX got its name"
                videoUrl="https://example.com/video.mp4"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <AdCard
                adText="Check out our latest product!"
                link="https://www.google.com"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <VideoCard
                videoTitle="The Wright Brothers"
                videoUrl="https://example.com/video.mp4"
              />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <VideoCard
                videoTitle="How to swim when you're having so much fun"
                videoUrl="https://example.com/video.mp4"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;