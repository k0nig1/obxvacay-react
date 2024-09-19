import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React from "react";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Change your settings here
        <IonButton expand="full" routerLink="/app" routerDirection="root">
          <IonIcon slot="start" icon={logOutOutline} />
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
