// CardComponents.tsx

import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import './CardComponents.css'; // Import the CSS file

// BaseCard Component - A general-purpose card component
const BaseCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IonCard>
      {children}
    </IonCard>
  );
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
        <IonButton href={link} expand="full">Learn More</IonButton>
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

export { BaseCard, AdCard, VideoCard };