import React, { Suspense } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";
import "./About.css"; // Import custom CSS
import logo from "../assets/flat_obxvacay.png";

const SocialMediaButtons = React.lazy(
  () => import("../components/SocialMediaButtons")
);

const About: React.FC = () => {
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
        <IonGrid className="about-container">
          <IonRow>
            <IonCol size="12" sizeMd="10" offsetMd="1">
              <IonText color="primary">
                <h1 className="about-title">
                  Welcome to OBX Vacay - Your Ultimate Outer Banks Vacation
                  Channel!
                </h1>
              </IonText>
              <IonText>
                <p className="about-text">
                  At OBX Vacay, we’re passionate about everything the Outer
                  Banks has to offer. From its stunning sandy shores to the
                  charming coastal towns, the Outer Banks is a paradise for
                  anyone seeking relaxation, adventure, and unforgettable
                  memories. Whether you're planning your first trip or you're a
                  regular visitor, we’re here to make your Outer Banks
                  experience the best it can be.
                </p>
              </IonText>
              <IonText color="secondary">
                <h2 className="about-subtitle">Our Mission</h2>
              </IonText>
              <IonText>
                <p className="about-text">
                  OBX Vacay was created to be the go-to resource for vacationers
                  in the Outer Banks. We aim to provide the most up-to-date,
                  engaging, and insightful content that showcases the beauty,
                  culture, and fun activities in this unique coastal
                  destination. We cover everything you need to know to plan the
                  perfect getaway – from the best beaches and outdoor adventures
                  to dining spots, local events, and hidden gems.
                </p>
              </IonText>

              <IonText color="secondary">
                <h2 className="about-subtitle">What We Offer</h2>
              </IonText>
              <IonList>
                <IonItem>
                  <p className="about-text">
                    <strong>Destination Guides:</strong> Discover the top spots
                    to explore, eat, and relax, with in-depth guides to help you
                    plan your stay.
                  </p>
                </IonItem>
                <IonItem>
                  <p className="about-text">
                    <strong>Local Insights:</strong> Get insider tips from
                    locals who know the Outer Banks inside and out, ensuring you
                    experience the area like a true OBX enthusiast.
                  </p>
                </IonItem>
                <IonItem>
                  <p className="about-text">
                    <strong>Travel Tips:</strong> From finding the perfect
                    vacation rental to navigating the best times to visit, our
                    travel tips will help you make the most of your trip.
                  </p>
                </IonItem>
                <IonItem>
                  <p className="about-text">
                    <strong>Events and Activities:</strong> Stay updated on
                    local events, festivals, and activities happening year-round
                    to ensure your vacation is packed with fun and excitement.
                  </p>
                </IonItem>
              </IonList>

              <IonText color="secondary">
                <h2 className="about-subtitle">Why Choose OBX Vacay?</h2>
              </IonText>
              <IonText>
                <p className="about-text">
                  The Outer Banks is more than just a vacation spot – it's a
                  lifestyle. With our dedicated team of local experts and travel
                  enthusiasts, OBX Vacay brings you the essence of the Outer
                  Banks, showcasing what makes it one of the most beloved
                  coastal destinations in the world. Our goal is to inspire your
                  adventures, simplify your planning, and enrich your vacation
                  with unforgettable moments.
                </p>
              </IonText>

              <IonText color="secondary">
                <h2 className="about-subtitle">
                  Join the OBX Vacay Community!
                </h2>
              </IonText>
              <IonText>
                <p className="about-text">
                  We love connecting with fellow travelers and sharing stories
                  of Outer Banks adventures. Follow us on social media,
                  subscribe to our newsletter, and dive into our latest content
                  to stay in the loop about everything OBX. Let’s make your next
                  vacation the best one yet!
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Suspense fallback={<div>Loading...</div>}>
          <SocialMediaButtons />
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default About;
