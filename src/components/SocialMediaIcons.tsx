import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { logoFacebook, logoTwitter, logoLinkedin, logoPinterest } from 'ionicons/icons';
import './SocialMediaIcons.css'; // Include this CSS file for styling

const SocialMediaIcons: React.FC = () => {
  return (
    <div className="social-media-icons">
      <IonButton href="https://www.facebook.com/obxvacay" target="_blank" fill="clear">
        <IonIcon icon={logoFacebook} slot="icon-only" />
      </IonButton>
      <IonButton href="https://twitter.com/obxvacay" target="_blank" fill="clear">
        <IonIcon icon={logoTwitter} slot="icon-only" />
      </IonButton>
      <IonButton href="https://www.linkedin.com/company/obxvacay" target="_blank" fill="clear">
        <IonIcon icon={logoLinkedin} slot="icon-only" />
      </IonButton>
      <IonButton href="https://www.pinterest.com/obxvacay" target="_blank" fill="clear">
        <IonIcon icon={logoPinterest} slot="icon-only" />
      </IonButton>
    </div>
  );
};

export default SocialMediaIcons;