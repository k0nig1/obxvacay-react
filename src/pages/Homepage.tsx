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
  IonToolbar,
  IonSpinner,
  IonImg,
} from "@ionic/react";
import "./Homepage.css";
import { useHistory } from "react-router-dom";
import { usePullToRefresh } from "../utilities/UsePullToRefresh";
import logo from "../assets/flat_obxvacay.png";
import obxvacay from "../assets/obx_vacay.png";
import obxvoice from "../assets/obxvoice.png";

const LivestreamReactPlayer = React.lazy(() => import("../components/LivestreamReactPlayer"));
const SocialMediaIcons = React.lazy(() => import("../components/SocialMediaButtons"));
const WeatherForecast = React.lazy(() => import("../components/WeatherForecast"));
const RadioPlayer = React.lazy(() => import("../components/RadioPlayer"));

const Homepage: React.FC = () => {
  const history = useHistory();
  const PullToRefresh = usePullToRefresh();

  const generateWebViewButton = (url: string, name: string, image: string, style: React.CSSProperties) => {
    const navigateToWebView = () => {
      history.push({
        pathname: "/webview",
        state: { url, name, image },
      });
    };

    return (
      <IonButton style={{ ...style, margin: "5px" }} fill="clear" onClick={navigateToWebView}>
        <IonImg src={image} className="external-link-img" alt={name} />
      </IonButton>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="center-logo">
          <div className="header-logo-container">
            <IonImg src={logo} className="header-logo" alt="OBX Vacay Logo" />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PullToRefresh />
        <IonGrid className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">

          {/* Livestream Player Section */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding livestream-card">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  <Suspense fallback={<IonSpinner />}>
                    <LivestreamReactPlayer />
                  </Suspense>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Weather Forecast Section */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding ion-no-margin weather-card">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  <Suspense fallback={<IonSpinner />}>
                    <WeatherForecast location="27959" />
                  </Suspense>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Radio Player Section */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding radio-card">
                <IonCardContent>
                  <h2>Listen to Live Radio</h2>
                  <Suspense fallback={<IonSpinner />}>
                    <RadioPlayer />
                  </Suspense>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* External Links Section */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding external-links-card">
                <IonCardContent>
                  <h2>News From The OBX</h2>
                  <div className="external-links">
                    {generateWebViewButton("https://outerbanksvoice.com", "OBX Voice", obxvoice, { width: "100%" })}
                    {/* {generateWebViewButton("https://obxvacay.com", "OBX Vacay", obxvacay, { width: "40%" })} */}
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Social Media Section */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding social-media-card">
                <IonCardContent>
                  <h2>Follow Us on Social Media</h2>
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