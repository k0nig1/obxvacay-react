import React, { useEffect } from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';

const RedirectPage: React.FC = () => {
  useEffect(() => {
    // Function to detect the user's device and redirect accordingly
    const redirectToApp = () => {
      const userAgent = navigator.userAgent || navigator.vendor;

      if (/android/i.test(userAgent)) {
        // Redirect Android users to the Google Play Store
        // window.location.href = 'https://play.google.com/store/apps/details?id=your.android.package.name';
        window.location.href = 'https://obxvacay-ionicreact.web.app/'
      } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        // Redirect iOS users to the Apple App Store
        // window.location.href = 'https://apps.apple.com/app/your-ios-app-id';
        window.location.href = 'https://obxvacay-ionicreact.web.app/';
      } else {
        // Redirect other users to a landing page or your website
        window.location.href = 'https://obxvacay-ionicreact.web.app/';
      }
    };

    // Call the redirect function on page load
    redirectToApp();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <IonSpinner name="crescent" />
          <p style={{ marginTop: '20px', textAlign: 'center' }}>Redirecting you to the appropriate app store...</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RedirectPage;