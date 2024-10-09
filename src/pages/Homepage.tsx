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
import "./Homepage.css"; // Import your custom CSS for further styling
import { useHistory } from "react-router-dom";
import { usePullToRefresh } from "../utilities/UsePullToRefresh";
import logo from "../assets/flat_obxvacay.png";
import obxvacay from "../assets/obx_vacay.png";
import obxvoice from "../assets/obxvoice.png";

const LivestreamReactPlayer = React.lazy(
  () => import("../components/LivestreamReactPlayer")
);
const SocialMediaIcons = React.lazy(
  () => import("../components/SocialMediaIcons")
);
const WeatherForecast = React.lazy(
  () => import("../components/WeatherForecast")
);

const Homepage: React.FC = () => {
  const history = useHistory();
  const PullToRefresh = usePullToRefresh();

  const generateWebViewButton = (url: string, name: string, image: string, style: React.CSSProperties) => {
    const navigateToWebView = () => {
      history.push(
        {
          pathname: "/webview",
          state: { url, name },
        },
        { direction: "forward" }
      );
    };

    return (
      <IonButton
        style={{ ...style, margin: "10px" }}
        fill="clear"
        onClick={navigateToWebView}
        routerDirection="forward"
      >
        <IonImg src={image} style={{ width: "100%" }} alt={name} />
      </IonButton>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="center-logo">
          <IonImg
            src={logo}
            className="header-logo"
            alt="OBX Vacay Logo"
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PullToRefresh />
        <IonGrid className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
          <IonRow className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol
              size="12"
              sizeMd="10"
              sizeLg="8"
              sizeXl="6"
              className="ion-no-margin ion-no-padding"
            >
              <IonCard className="ion-no-margin ion-no-padding">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  <Suspense fallback={<IonSpinner />}>
                    <LivestreamReactPlayer />
                  </Suspense>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol
              className="ion-no-padding"
              size="12"
              sizeMd="10"
              sizeLg="8"
              sizeXl="6"
            >
              <IonCard className="ion-no-padding ion-justify-content-center">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  <Suspense fallback={<IonSpinner />}>
                    <WeatherForecast location="27959" />
                  </Suspense>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol
              size="12"
              sizeMd="10"
              sizeLg="8"
              sizeXl="6"
              className="ion-no-margin ion-no-padding"
            >
              <IonCard className="ion-no-padding">
                <IonCardContent className="ion-no-padding ion-justify-content-center ion-align-items-center">
                  <h2>Visit External Pages</h2>
                  <div className="external-links">
                    {generateWebViewButton(
                      "https://outerbanksvoice.com",
                      "OBX Voice",
                      obxvoice,
                      { width: "50%" }
                    )}
                    {generateWebViewButton(
                      "https://obxvacay.com",
                      "OBX Vacay",
                      obxvacay,
                      { width: "25%" }
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center">
            <IonCol
              size="12"
              sizeMd="10"
              sizeLg="8"
              sizeXl="6"
              className="ion-no-margin ion-no-padding"
            >
              <IonCard className="ion-no-margin ion-no-padding">
                <IonCardContent className="ion-no-margin ion-no-padding ion-justify-content-center ion-align-items-center">
                  <h2>Follow Us On Social Media</h2>
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