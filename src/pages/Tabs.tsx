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
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, homeOutline, settingsOutline } from "ionicons/icons";
import React from "react";
import Homepage from "./Homepage";
import Tab2 from "./Tab2";
import Settings from "./Settings";

const Tabs: React.FC = () => {
  return (
    <IonPage>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/app/homepage" component={Homepage} exact />
            <Route path="/app/tab2" component={Tab2} exact />
            <Route path="/app/settings" component={Settings} exact />
            <Route path="/app" exact>
              <Redirect to="/app/homepage" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="homepage" href="/app/homepage">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Homepage</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/app/tab2">
              <IonIcon aria-hidden="true" icon={ellipse} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/app/settings">
              <IonIcon aria-hidden="true" icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonPage>
  );
};

export default Tabs;
