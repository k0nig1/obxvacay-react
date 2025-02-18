import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ecr.obxvacay',
  appName: 'OBX Vacay',
  webDir: 'dist'
,
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
