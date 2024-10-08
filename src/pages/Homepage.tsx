import React, { Suspense } from "react";
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
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

// Lazy load the components
const LivestreamReactPlayer = React.lazy(() => import("../components/LivestreamReactPlayer"));
const SocialMediaIcons = React.lazy(() => import("../components/SocialMediaIcons"));
const WeatherForecast = React.lazy(() => import("../components/WeatherForecast"));

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
                  {/* Use Suspense to lazily load LivestreamReactPlayer */}
                  <Suspense fallback={<IonSpinner />}>
                    <LivestreamReactPlayer />
                  </Suspense>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Weather Forecast Section */}
          <IonRow className="ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol className="ion-no-padding" size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding ion-justify-content-center">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  {/* Use Suspense to lazily load WeatherForecast */}
                  <Suspense fallback={<IonSpinner />}>
                    <WeatherForecast location="27959" />
                  </Suspense>
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
                  {/* Use Suspense to lazily load SocialMediaIcons */}
                  <Suspense fallback={<IonSpinner />}>
                    <SocialMediaIcons />
                  </Suspense>
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