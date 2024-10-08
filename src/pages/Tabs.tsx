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
import { ellipse, homeOutline, settingsOutline } from "ionicons/icons";
import React from "react";
import Homepage from "./Homepage";
import Tab2 from "./Tab2";
import Settings from "./Settings";
import About from "./About";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/homepage" component={Homepage} exact />
        <Route path="/app/tab2" component={Tab2} exact />
        <Route path="/app/settings" component={Settings} exact />
        <Route path="/app/about" component={About} exact />
        <Route path="/app" exact>
          <Redirect to="/app/homepage" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="homepage" href="/app/homepage">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Homepage</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/app/about">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;