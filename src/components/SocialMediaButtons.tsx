import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { logoFacebook, logoInstagram, logoYoutube, link } from "ionicons/icons";
import { Browser } from "@capacitor/browser";
import "./SocialMediaButtons.css"; // Include this CSS file for styling

const SocialMediaButtons: React.FC = () => {
  
  // Function to open URLs using Capacitor Browser
  const openInCapacitorBrowser = async (url: string) => {
    await Browser.open({ url });
  };

  return (
    <div>
      <div className="social-media-icons">
        <IonButton
          onClick={() => openInCapacitorBrowser("https://www.instagram.com/obxvacaychannel/?igsh=bzlnNmF4eDVxcGF4")}
          fill="clear"
        >
          <IonIcon icon={logoInstagram} slot="icon-only" />
        </IonButton>

        <IonButton
          onClick={() => openInCapacitorBrowser("https://www.facebook.com/obxvacaychannel")}
          fill="clear"
        >
          <IonIcon icon={logoFacebook} slot="icon-only" />
        </IonButton>

        <IonButton
          onClick={() => openInCapacitorBrowser("https://www.youtube.com/@obxvacaychannel")}
          fill="clear"
        >
          <IonIcon icon={logoYoutube} slot="icon-only" />
        </IonButton>

        <IonButton
          onClick={() => openInCapacitorBrowser("https://www.obxvacay.com/")}
          fill="clear"
        >
          <IonIcon icon={link} slot="icon-only" />
        </IonButton>
      </div>
    </div>
  );
};

export default SocialMediaButtons;