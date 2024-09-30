import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonLoading,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React from "react";
import { Preferences } from "@capacitor/preferences"; // To handle storage
import { logOut } from "../FirebaseServices";

const Settings: React.FC = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();

  // Logout function
  const handleLogout = async () => {
    await present('Logging out...');
    try {
      // Clear user data from storage
      logOut();
      // Redirect to login page
      router.push("/app", "root");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dismiss();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Change your settings here
        <IonButton expand="full" onClick={handleLogout}>
          <IonIcon slot="start" icon={logOutOutline} />
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;