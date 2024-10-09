import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonBackButton,
  useIonRouter,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import React from "react";
import { checkmarkDoneOutline } from "ionicons/icons";

const Register: React.FC = () => {
  const router = useIonRouter();

  const doRegister = (event: any) => {
    event.preventDefault();
    console.log("doRegister");
    router.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButton color={"success"} slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButton>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
                    <IonInput
                      fill="outline"
                      labelPlacement="floating"
                      label="email"
                      placeholder="youremail@domain.com"
                    ></IonInput>
                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement="floating"
                      label="password"
                      placeholder="yourpassword"
                    ></IonInput>
                    <IonButton
                      type="submit"
                      expand="block"
                      className="ion-margin-top"
                    >
                      Create My Account
                      <IonIcon icon={checkmarkDoneOutline} slot="end" />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
