import React, { Suspense, useEffect } from "react";
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
import { SponsorCard } from "../components/CardComponents";
import obx4sale from "../assets/obx4sale.png";
import { openInCapacitorBrowser } from "../utilities/openInCapacitorBrowser";
import { SplashScreen } from "@capacitor/splash-screen";

const LivestreamReactPlayer = React.lazy(
  () => import("../components/LivestreamReactPlayer")
);
const SocialMediaButtons = React.lazy(
  () => import("../components/SocialMediaButtons") // Ensure this path is correct
);
const WeatherForecast = React.lazy(
  () => import("../components/WeatherForecast")
);
const RadioPlayer = React.lazy(() => import("../components/RadioPlayer"));

const Homepage: React.FC = () => {
  const PullToRefresh = usePullToRefresh();

  // Hide the splash screen when the component mounts
  useEffect(() => {
    // Delay hiding the splash screen for 5 seconds
    const splashScreenTimer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    return () => clearTimeout(splashScreenTimer);
  }, []);

  const generateWebViewButton = (
    url: string,
    name: string,
    image: string,
    style: React.CSSProperties
  ) => {
    return (
      <IonButton
        style={{ ...style, margin: "5px" }}
        fill="clear"
        onClick={() => {
          openInCapacitorBrowser(url);
        }}
      >
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
                  <h2>Tune In to the Sounds of the OBX</h2>
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
                    {generateWebViewButton(
                      "https://outerbanksvoice.com",
                      "OBX Voice",
                      obxvoice,
                      { width: "100%" }
                    )}
                    {generateWebViewButton(
                      "https://obxvacay.com",
                      "OBX Vacay Buttons",
                      obxvacay,
                      { width: "40%" }
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Sponsor Section */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
              <IonCard className="ion-no-padding social-media-card">
                <IonCardContent>
                  <h2>Proudly Supported By Our Sponsors</h2>
                  <Suspense fallback={<IonSpinner />}>
                    <SponsorCard
                      sponsorName="obx4sale.com"
                      sponsorLogo={obx4sale}
                      sponsorLink="https://obx4sale.com"
                    />
                    <SponsorCard
                      sponsorName="obx4sale.com"
                      sponsorLogo={obx4sale}
                      sponsorLink="https://obx4sale.com"
                    />
                  </Suspense>
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
                    <SocialMediaButtons />
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
