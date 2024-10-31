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
import { openInCapacitorBrowser } from "../utilities/openInCapacitorBrowser";

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

// Main RadioPlayer component
const RadioPlayer: React.FC = () => {
  
  return (
    <>
      <IonButtons className="station-list">
      {stations.map((station) => (
        <IonButton
          key={station.id}
          fill="clear"
          onClick={() => openInCapacitorBrowser(station.web_url)}
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
    </>
  );
};

export default RadioPlayer;
