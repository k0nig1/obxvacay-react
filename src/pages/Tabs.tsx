import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import { ellipse, homeOutline, informationCircleOutline, settingsOutline } from "ionicons/icons";
import React from "react";
import Homepage from "./Homepage";
import Settings from "./Settings";
import About from "./About";
import "./Tabs.css";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/homepage" component={Homepage} exact />
        <Route path="/app/settings" component={Settings} exact />
        <Route path="/app/about" component={About} exact />
        <Route path="/app" exact>
          <Redirect to="/app/homepage" />
        </Route>
      </IonRouterOutlet>

      {/* Ensure the tab bar uses the defined class for CSS to apply */}
      <IonTabBar slot="bottom" className="ion-tab-bar">
        <IonTabButton tab="homepage" href="/app/homepage">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Homepage</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/app/about">
          <IonIcon aria-hidden="true" icon={informationCircleOutline} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="settings" href="/app/settings">
          <IonIcon aria-hidden="true" icon={settingsOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton> */}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;