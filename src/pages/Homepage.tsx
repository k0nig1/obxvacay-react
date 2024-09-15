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
import { AdCard, VideoCard, LinkCard } from "../components/CardComponents";

const Homepage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Homepage</IonTitle>
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
                  <LivestreamVideojs />
                </IonCardContent>
              </IonCard> */}
              <LinkCard title="Login" name="Login Here" link="/login" />
              <AdCard
                adText="Check out our latest product!"
                link="https://www.google.com"
              />
              <VideoCard
                videoTitle="Puppies open a cat store"
                videoUrl="https://example.com/video.mp4"
              />
              <VideoCard
                videoTitle="The world is getting smaller"
                videoUrl="https://example.com/video.mp4"
              />
              <VideoCard
                videoTitle="Dont forget to floss!"
                videoUrl="https://example.com/video.mp4"
              />
              <VideoCard
                videoTitle="How the OBX got its name"
                videoUrl="https://example.com/video.mp4"
              />
              <AdCard
                adText="Check out our latest product!"
                link="https://www.google.com"
              />
              <VideoCard
                videoTitle="The Wright Brothers"
                videoUrl="https://example.com/video.mp4"
              />
              <VideoCard
                videoTitle="How to swim when you're having so much fun"
                videoUrl="https://example.com/video.mp4"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
