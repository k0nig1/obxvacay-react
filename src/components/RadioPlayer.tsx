import {
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonImg,
  IonActionSheet,
  IonButtons,
  IonSpinner,
} from "@ionic/react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  closeOutline,
  exitOutline,
  infiniteOutline,
  playOutline,
  pauseOutline,
  removeOutline,
  contractOutline,
} from "ionicons/icons";
import radioLogo_WERX from "../assets/radioLogos/radioLogo_WERX.png";
import radioLogo_WJKX from "../assets/radioLogos/radioLogo_WJKX.png";
import radioLogo_WRSF from "../assets/radioLogos/radioLogo_WRSF.png";
import radioLogo_WOBR from "../assets/radioLogos/radioLogo_WOBR.png";
import radioLogo_WOBX from "../assets/radioLogos/radioLogo_WOBX.png";
import "./RadioPlayer.css";

// Types
interface Station {
  id: number;
  name: string;
  web_url: string;
  raw_url: string;
  icon: string;
}

// Sample data for radio stations
const stations: Station[] = [
  {
    id: 1,
    name: "102.5 The Shark (WERX)",
    web_url: "https://rdo.to/WERX",
    raw_url: "https://ice5.securenetsystems.net/WERX",
    icon: radioLogo_WERX,
  },
  {
    id: 2,
    name: "95.7 The Coast (WKJX)",
    web_url: "https://rdo.to/WKJXFM",
    raw_url: "https://hls-test.securenetsystems.net/hls/wkjxfm/index.m3u8",
    icon: radioLogo_WJKX,
  },
  {
    id: 3,
    name: "Dixie 105.7 (WRSF)",
    web_url: "https://rdo.to/WRSF",
    raw_url: "https://ice7.securenetsystems.net/WRSF",
    icon: radioLogo_WRSF,
  },
  {
    id: 4,
    name: "Pirate 95.3 (WOBR)",
    web_url: "https://rdo.to/WOBR",
    raw_url: "https://ice7.securenetsystems.net/WOBR",
    icon: radioLogo_WOBR,
  },
  {
    id: 5,
    name: "98.1 The OBX",
    web_url: "https://rdo.to/WOBXAM",
    raw_url: "https://ice5.securenetsystems.net/WOBX",
    icon: radioLogo_WOBX,
  },
];

// Reusable component for the list of stations
const StationList: React.FC<{
  stations: Station[];
  onStationClick: (station: Station) => void;
}> = ({ stations, onStationClick }) => (
    <IonButtons className="station-list">
      {stations.map((station) => (
        <IonButton
          key={station.id}
          fill="clear"
          onClick={() => onStationClick(station)}
          className="station-button"
        >
          <IonImg
            src={station.icon}
            className="station-icon"
            alt={station.name}
          />
        </IonButton>
      ))}
    </IonButtons>
);

// Updated Minimized Player component with ReactPlayer controls
const MinimizedPlayer: React.FC<{
  station: Station;
  isPlaying: boolean;
  togglePlayPause: () => void;
  reopenModal: () => void;
  exitRadio: () => void;
}> = ({ station, isPlaying, togglePlayPause, reopenModal, exitRadio }) => (
  <div className="minimized-player">
    <div className="minimized-info" onClick={reopenModal}>
      <IonImg
        src={station.icon}
        className="minimized-icon"
        alt={station.name}
      />
      <h5>{station.name}</h5>
    </div>
    <div className="player-controls">
      <IonButton color="dark" onClick={togglePlayPause} fill="clear">
        <IonIcon icon={isPlaying ? pauseOutline : playOutline} />
      </IonButton>
      <IonButton color="dark" onClick={exitRadio} fill="clear">
        <IonIcon icon={closeOutline} />
      </IonButton>
    </div>
  </div>
);

// Reusable component for the modal
const StationModal: React.FC<{
  station: Station;
  closeModal: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}> = ({ station, closeModal, isLoading, setIsLoading }) => (
  <IonModal isOpen={!!station} onDidDismiss={closeModal}>
    <IonHeader>
      <IonToolbar>
        <IonImg src={station.icon} className="modal-icon" alt={station.name} />
        <IonButton color="light" onClick={closeModal} slot="end" fill="clear">
          <IonIcon icon={closeOutline} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <div className="station-modal-content">
        {isLoading && <IonSpinner name="dots" className="loading-spinner" />}
        <iframe
          src={station.web_url}
          title={`${station.name} website`}
          className="station-iframe"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </IonContent>
  </IonModal>
);

// Main RadioPlayer component
const RadioPlayer: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    setIsPlaying(true);
    setIsLoading(true);
  };

  const closeModal = () => {
    setSelectedStation(null);
    setIsPlaying(false);
    setIsLoading(false);
  };

  return (
    <>
      <StationList stations={stations} onStationClick={handleStationClick} />

      {selectedStation && (
        <StationModal
          station={selectedStation}
          closeModal={closeModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default RadioPlayer;
