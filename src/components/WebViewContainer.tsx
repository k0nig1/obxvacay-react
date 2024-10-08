import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react';
import { useLocation } from 'react-router-dom';

const WebViewContainer: React.FC = () => {
  const location = useLocation<{ url: string }>(); // Get the URL from location state
  const webpageUrl = location.state?.url || 'https://obxvacay.com'; // Default URL if none is passed

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* Ensure the IonBackButton always shows by using a defaultHref */}
            <IonBackButton defaultHref="/app/homepage" color="primary"/>
          </IonButtons>
          <IonTitle>Web Page Viewer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Display the webpage inside an iframe */}
        <iframe 
          src={webpageUrl} 
          style={{ width: '100%', height: '100%' }} 
          frameBorder="0"
          title="WebView"
        />
      </IonContent>
    </IonPage>
  );
};

export default WebViewContainer;