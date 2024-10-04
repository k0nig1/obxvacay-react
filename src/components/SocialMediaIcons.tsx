import React from 'react';
import { IonContent, IonButton, IonIcon } from '@ionic/react';
import { logoFacebook, logoInstagram, logoTwitter, logoYoutube } from 'ionicons/icons';
import './SocialMediaIcons.css'; // Include this CSS file for styling

const SocialMediaIcons: React.FC = () => {
  return (
      <div className="social-media-icons">
        <IonButton href="https://www.facebook.com/obxvacay" target="_blank" fill="clear">
          <IonIcon icon={logoFacebook} slot="icon-only" />
        </IonButton>
        <IonButton href="https://www.instagram.com/obxvacay" target="_blank" fill="clear">
          <IonIcon icon={logoInstagram} slot="icon-only" />
        </IonButton>
        <IonButton href="https://twitter.com/obxvacay" target="_blank" fill="clear">
          <IonIcon icon={logoTwitter} slot="icon-only" />
        </IonButton>
        <IonButton href="https://www.youtube.com/obxvacay" target="_blank" fill="clear">
          <IonIcon icon={logoYoutube} slot="icon-only" />
        </IonButton>
      </div>
  );
};

export default SocialMediaIcons;