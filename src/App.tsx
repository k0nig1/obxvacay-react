import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "video.js/dist/video-js.css";

/* Dark Mode and Theme */
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import "./theme/global.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tabs from "./pages/Tabs";
import NotFoundPage from "./pages/NotFoundPage";
import WebViewContainer from "./components/WebViewContainer";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          {/* Redirect root URL '/' to '/app' */}
          <Route exact path="/" render={() => <Redirect to="/app" />} />

          {/* Main tabbed pages under '/app' */}
          <Route path="/app" component={Tabs} />

          {/* Route for '/webview' */}
          <Route exact path="/webview" component={WebViewContainer} />

          {/* Login and Register */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          {/* Catch-all route for unknown URLs */}
          <Route path="/error" component={NotFoundPage} />
          <Route path="*" render={() => <Redirect to="/error" />} />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;