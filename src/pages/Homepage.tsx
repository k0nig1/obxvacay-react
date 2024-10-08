import React from "react";
import {
  IonButton,
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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import LivestreamReactPlayer from "../components/LivestreamReactPlayer";
import SocialMediaIcons from "../components/SocialMediaIcons";
import WeatherForecast from "../components/WeatherForecast";

const Homepage: React.FC = () => {
  const history = useHistory();

  // Function to generate the webview button with the given URL
  const generateWebViewButton = (url: string, name: string) => {
    const navigateToWebView = () => {
      history.push(
        {
          pathname: "/webview",
          state: { url: url, name: name },
        },
        { direction: "forward" }
      ); // Ensure forward routing direction
    };

    return (
      <IonButton
        expand="block"
        onClick={navigateToWebView}
        routerDirection="forward"
      >
        {name}
      </IonButton>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>OBX Vacay</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
          {/* Livestream Section */}
          <IonRow className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6" className="ion-no-margin ion-no-padding">
              <IonCard className="ion-no-margin ion-no-padding">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  <LivestreamReactPlayer />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Weather Forecast Section */}
          <IonRow className="ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol className="ion-no-padding" size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding ion-justify-content-center">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  <WeatherForecast location="Nags Head, NC" />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* External Pages Section */}
          <IonRow className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6" className="ion-no-margin ion-no-padding">
              <IonCard className="ion-no-padding">
                <IonCardContent className="ion-no-padding ion-justify-content-center ion-align-items-center">
                  <h2>Visit External Pages</h2>
                  {generateWebViewButton("https://outerbanksvoice.com", "Outer Banks Voice")}
                  {generateWebViewButton("https://obxvacay.com", "OBXVacay")}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Social Media Section */}
          <IonRow className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6" className="ion-no-margin ion-no-padding">
              <IonCard className="ion-no-margin ion-no-padding">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
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