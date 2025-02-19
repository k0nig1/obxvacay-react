import type { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local'});

const config: CapacitorConfig = {
  appId: 'com.ecr.obxvacay',
  appName: 'OBX Vacay',
  webDir: 'dist',
  plugins: {
    GoogleMaps: {
      key: process.env.VITE_GOOGLE_MAPS_API_KEY || "",
    }
  },
  ios:{
    scheme: "OBX Vacay",
  },
  android: {
      buildOptions: {
        keystorePath: 'undefined',
        keystoreAlias: 'undefined',
      }
  }
  };

export default config;
