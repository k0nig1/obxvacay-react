import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { useLocation } from "react-router-dom";

const WebViewContainer: React.FC = () => {
  const location = useLocation<{ url: string; name: string }>(); // Get the URL and name from location state
  const webpageUrl = location.state?.url || "https://obxvacay.com"; // Default URL if none is passed
  const webpageName = location.state?.name || "Web Page"; // Default name if none is passed
  const [isLoading, setIsLoading] = useState(true); // Loading state for iframe

  // Event handler to hide spinner when iframe finishes loading
  const handleIframeLoad = () => {
    setIsLoading(false); // Hide spinner when content is loaded
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton color={"success"} slot="start">
            <IonBackButton defaultHref="/app/homepage" />
          </IonButton>
          <IonTitle>{webpageName}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Display loading spinner when iframe is loading */}
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IonSpinner name="crescent" />
          </div>
        )}

        {/* Display the webpage inside an iframe */}
        <iframe
          src={webpageUrl}
          style={{
            width: "100%",
            height: "100%",
            display: isLoading ? "none" : "block",
          }}
          frameBorder="0"
          title={webpageName}
          onLoad={handleIframeLoad} // Hide spinner when iframe content is fully loaded
        />
      </IonContent>
    </IonPage>
  );
};

export default WebViewContainer;
