import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonFooter,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import logo from '../assets/flat_obxvacay.png';
import './PrivacyNotice.css';

const PrivacyNotice: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="center-logo">
          <div className="header-logo-container">
            <IonImg src={logo} className="header-logo" alt="OBX Vacay Logo" />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="privacy-container">
          <IonRow>
            <IonCol size="12" sizeMd="10" offsetMd="1">
              <IonText color="primary">
                <h1 className="privacy-title">Privacy Notice</h1>
              </IonText>
              <IonText>
                <p className="privacy-text">
                  At <strong>OBX Vacay</strong>, your privacy is our priority. We are committed to
                  being transparent about how we handle your data.
                </p>
              </IonText>
              <IonText color="secondary">
                <h2 className="privacy-subtitle">Current Data Policy</h2>
              </IonText>
              <IonText>
                <p className="privacy-text">
                  As of now, our app does <strong>not</strong> track, collect, or store any of your
                  personal or usage data. You can use the app with complete confidence that your
                  interactions remain private.
                </p>
              </IonText>
              <IonText color="secondary">
                <h2 className="privacy-subtitle">Upcoming Changes</h2>
              </IonText>
              <IonText>
                <p className="privacy-text">
                  In the future, we plan to introduce features that may require tracking certain data to
                  enhance your experience. For example, we may collect usage statistics to better
                  understand how our app is used or provide personalized content based on your
                  preferences.
                </p>
                <p className="privacy-text">
                  When we implement these changes, we will update our privacy policy and notify you in
                  advance. We will also provide clear options for you to manage your data and control
                  what is shared.
                </p>
              </IonText>
              <IonText color="secondary">
                <h2 className="privacy-subtitle">Your Rights</h2>
              </IonText>
              <IonText>
                <p className="privacy-text">
                  You will always have the right to:
                </p>
                <ul>
                  <li>Understand what data is being collected and why.</li>
                  <li>Opt-out of data tracking if you choose.</li>
                  <li>Request the deletion of your data.</li>
                </ul>
                <p className="privacy-text">
                  We are committed to ensuring your data is handled responsibly and in compliance with
                  applicable laws.
                </p>
              </IonText>
              <IonButton expand="full" routerLink="/">Back to Home</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonText className="ion-text-center">
            <p>&copy; {new Date().getFullYear()} OBX Vacay. All rights reserved.</p>
          </IonText>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PrivacyNotice;
