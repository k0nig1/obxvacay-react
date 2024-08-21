import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import Intro from "../components/Intro";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(false);

  const doLogin = (event: any) => {
    event.preventDefault();
    console.log("doLogin");
    router.push("/tab1", "root");
  };

  const finishIntro = async () => {
    console.log("FIN");
    setIntroSeen(true);
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonCard>
              <IonCardContent>
                <form onSubmit={doLogin}>
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
                    Login
                    <IonIcon icon={logInOutline} slot="end" />
                  </IonButton>
                  <IonButton
                    routerLink="/register"
                    color="secondary"
                    type="submit"
                    expand="block"
                    className="ion-margin-top"
                  >
                    Create Account
                    <IonIcon icon={personCircleOutline} slot="end" />
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
