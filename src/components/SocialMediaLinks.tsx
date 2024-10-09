import React from 'react';
import { IonContent, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { logoFacebook, logoInstagram, logoTwitter, logoYoutube } from 'ionicons/icons';
// import './SocialMediaLinks.css'; // Optional: Add custom CSS for styling

const SocialMediaLinks: React.FC = () => {
  return (
    <IonContent className="ion-padding">
      <IonList>
        <IonItem button href="https://www.facebook.com/obxvacay" target="_blank">
          <IonIcon icon={logoFacebook} slot="start" />
          <IonLabel>Facebook</IonLabel>
        </IonItem>
        <IonItem button href="https://www.instagram.com/obxvacay" target="_blank">
          <IonIcon icon={logoInstagram} slot="start" />
          <IonLabel>Instagram</IonLabel>
        </IonItem>
        <IonItem button href="https://twitter.com/obxvacay" target="_blank">
          <IonIcon icon={logoTwitter} slot="start" />
          <IonLabel>Twitter</IonLabel>
        </IonItem>
        <IonItem button href="https://www.youtube.com/obxvacay" target="_blank">
          <IonIcon icon={logoYoutube} slot="start" />
          <IonLabel>YouTube</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default SocialMediaLinks;