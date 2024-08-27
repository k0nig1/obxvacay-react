import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import LivestreamReactPlayer from "../components/LivestreamReactPlayer";
import LiveStreamHls from "../components/LivestreamHls";
import LivestreamVideojs from "../components/LivestreamVideojs";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Livestream Players</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <LivestreamReactPlayer />
                </IonCardContent>
              </IonCard>
              {/* <IonCard>
                <IonCardContent>
                  <LiveStreamHls />
                </IonCardContent>
              </IonCard> */}
              <IonCard>
                <IonCardContent>
                  <LivestreamVideojs />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
