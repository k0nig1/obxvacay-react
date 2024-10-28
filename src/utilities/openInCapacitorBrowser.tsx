import { Browser } from "@capacitor/browser";

// Function to open URLs using Capacitor Browser
export const openInCapacitorBrowser = async (url: string) => {
    await Browser.open({ url });
  };