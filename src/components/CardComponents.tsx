import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonImg,
} from "@ionic/react";
import "./CardComponents.css"; // Import the CSS file

// BaseCard Component - A general-purpose card component
const BaseCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <IonCard>{children}</IonCard>;
};

// AdCard Component - A specialized card for advertisements
interface AdCardProps {
  adText: string;
  link: string;
}

const AdCard: React.FC<AdCardProps> = ({ adText, link }) => {
  return (
    <BaseCard>
      <IonCardHeader>
        <IonCardTitle className="ad-card-title">Advertisement</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="ad-card-content">
        {adText}
        <IonButton href={link} expand="full">
          Learn More
        </IonButton>
      </IonCardContent>
    </BaseCard>
  );
};

// VideoCard Component - A specialized card for video content
interface VideoCardProps {
  videoTitle: string;
  videoUrl: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoTitle, videoUrl }) => {
  return (
    <BaseCard>
      <IonCardHeader>
        <IonCardTitle className="video-card-title">{videoTitle}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="video-card-content">
        {/* <video controls src={videoUrl}></video> */}
        <h3>Video Content</h3>
      </IonCardContent>
    </BaseCard>
  );
};

interface LinkCardProps {
  title: string;
  name: string;
  link: string;
}
const LinkCard: React.FC<LinkCardProps> = ({ title, name, link }) => {
  return (
    <BaseCard>
      <IonCardHeader>
        <IonCardTitle className="video-card-title">{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton href={link} expand="full">
          {name}
        </IonButton>
      </IonCardContent>
    </BaseCard>
  );
};

// SponsorCard Component - A specialized card for sponsors
interface SponsorCardProps {
  sponsorName: string;
  sponsorLogo: string;
  sponsorLink: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsorName, sponsorLogo, sponsorLink }) => {
  return (
    <BaseCard>
      <IonImg src={sponsorLogo} alt={sponsorName} />
      <IonCardHeader>
        <IonCardTitle className="sponsor-card-title">{sponsorName}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton expand="block" href={sponsorLink} target="_blank">
          Visit Sponsor
        </IonButton>
      </IonCardContent>
    </BaseCard>
  );
};

export { BaseCard, AdCard, VideoCard, LinkCard, SponsorCard };