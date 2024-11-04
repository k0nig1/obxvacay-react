import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SplashScreen } from '@capacitor/splash-screen';

const container = document.getElementById('root');
const root = createRoot(container!);
SplashScreen.show({
  autoHide: false
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);