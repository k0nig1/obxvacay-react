// 404Page.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 - Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        <h2>The page you're looking for doesn't exist.</h2>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;