import {
    IonButton,
    IonIcon,
    IonModal,
    IonContent,
    IonHeader,
    IonTitle,
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
  } from "ionicons/icons";
  import radioLogo_WERX from "../assets/radioLogos/radioLogo_WERX.png";
  import radioLogo_WJKX from "../assets/radioLogos/radioLogo_WJKX.png";
  import radioLogo_WRSF from "../assets/radioLogos/radioLogo_WRSF.png";
  import radioLogo_WOBR from "../assets/radioLogos/radioLogo_WOBR.png";
  import radioLogo_WOBX from "../assets/radioLogos/radioLogo_WOBX.png";
  import "./RadioPlayer.css"; // Move inline styles here
  
  // Sample data for radio stations
  const stations = [
    {
      id: 1,
      name: "102.5 The Shark (WERX)",
      url: "https://ice5.securenetsystems.net/WERX",
      icon: radioLogo_WERX,
    },
    {
      id: 2,
      name: "95.7 The Coast (WJKX)",
      url: "https://hls-test.securenetsystems.net/hls/wkjxfm/index.m3u8",
      icon: radioLogo_WJKX,
    },
    {
      id: 3,
      name: "Dixie 105.7 (WRSF)",
      url: "https://ice7.securenetsystems.net/WRSF",
      icon: radioLogo_WRSF,
    },
    {
      id: 4,
      name: "Pirate 95.3 (WOBR)",
      url: "https://ice7.securenetsystems.net/WOBR",
      icon: radioLogo_WOBR,
    },
    {
      id: 5,
      name: "98.1 The OBX",
      url: "https://ice5.securenetsystems.net/WOBX",
      icon: radioLogo_WOBX,
    },
  ];
  
  // Reusable component for the list of stations
const StationList = ({ stations, onStationClick }: any) => (
  <IonButtons className="station-list">
    {stations.map((station: any) => (
      <IonButton
        key={station.id}
        fill="clear"
        onClick={() => onStationClick(station)}
        className="station-button"
      >
        <IonImg src={station.icon} className="station-icon" alt={station.name} />
      </IonButton>
    ))}
  </IonButtons>
);
  
  // Reusable component for the minimized player
  const MinimizedPlayer = ({ station, isPlaying, reopenModal, exitRadio, isLoading, setIsLoading }: any) => (
    <div className="minimized-player">
      <div className="minimized-info" onClick={reopenModal}>
        <IonImg src={station?.icon} className="minimized-icon" alt={station?.name} />
        <h5>{station?.name ?? "Unknown Station"}</h5>
      </div>
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        {/* Show spinner while loading, but also render the player */}
        {isLoading && (
          <IonSpinner
            name="dots"
            style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
          />
        )}
        <ReactPlayer
          url={station?.url}
          playing={isPlaying}
          controls
          width="200px"
          height="40px"
          config={{ file: { forceAudio: true } }}
          onBuffer={() => setIsLoading(true)}
          onReady={() => setIsLoading(false)}
        />
      </div>
      <IonButton color={"light"} onClick={exitRadio} fill="clear">
        <IonIcon icon={closeOutline} />
      </IonButton>
    </div>
  );
  
  // Reusable component for the modal
  const StationModal = ({ station, isPlaying, minimizeModal, closeModal, isLoading, setIsLoading }: any) => (
    <IonModal isOpen={!!station} onDidDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{station?.name}</IonTitle>
          <IonButton color={"light"} onClick={minimizeModal} slot="start" fill="clear">
            <IonIcon icon={infiniteOutline} />
          </IonButton>
          <IonButton color={"light"} onClick={closeModal} slot="end" fill="clear">
            <IonIcon icon={closeOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonImg src={station?.icon} className="modal-icon" alt={station?.name} />
        <div style={{ position: "relative" }}>
          {/* Show spinner while loading, but also render the player */}
          {isLoading && (
            <IonSpinner
              name="dots"
              style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            />
          )}
          <ReactPlayer
            url={station?.url}
            playing={isPlaying}
            controls
            width="100%"
            height="50px"
            config={{ file: { forceAudio: true } }}
            onBuffer={() => setIsLoading(true)}
            onReady={() => setIsLoading(false)}
          />
        </div>
      </IonContent>
    </IonModal>
  );
  
  const RadioPlayer: React.FC = () => {
    const [selectedStation, setSelectedStation] = useState<any>(null);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State to handle loading spinner
    const [showActionSheet, setShowActionSheet] = useState(false);
  
    const handleStationClick = (station: any) => {
      setSelectedStation(station);
      setIsMinimized(false);
      setIsPlaying(true);
      setIsLoading(true); // Start loading state
    };
  
    const closeModal = () => {
      setSelectedStation(null);
      setIsPlaying(false);
      setIsLoading(false); // Stop loading state
    };
  
    const minimizeModal = () => setIsMinimized(true);
    const reopenModal = () => setIsMinimized(false);
    const exitRadio = () => closeModal();
  
    return (
      <>
        <StationList stations={stations} onStationClick={handleStationClick} />
  
        {selectedStation && !isMinimized && (
          <StationModal
            station={selectedStation}
            isPlaying={isPlaying}
            minimizeModal={minimizeModal}
            closeModal={closeModal}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
  
        {isMinimized && (
          <MinimizedPlayer
            station={selectedStation}
            isPlaying={isPlaying}
            reopenModal={reopenModal}
            exitRadio={exitRadio}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
  
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Exit Radio",
              role: "destructive",
              icon: exitOutline,
              handler: exitRadio,
            },
            { text: "Cancel", role: "cancel" },
          ]}
        />
      </>
    );
  };
  
  export default RadioPlayer;