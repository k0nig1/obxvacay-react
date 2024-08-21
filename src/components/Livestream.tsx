import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import ReactPlayer from 'react-player';
import './Livestream.css';  // Import the CSS file

const Livestream: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Live Stream</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="responsive-player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8"
            playing={true}         // Auto-play the stream
            controls={true}        // Show player controls
            width="100%"           // Ensure the player takes full width
            height="100%"          // Ensure the player takes full height
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Livestream;