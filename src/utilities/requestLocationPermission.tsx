import { Geolocation } from "@capacitor/geolocation";
import { PermissionState } from "@capacitor/core";

export const requestLocationPermission = async () => {
  try {
    const permStatus = await Geolocation.requestPermissions();

    if (permStatus.location === "granted") {
      console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }
  } catch (error) {
    console.error("Error requesting location permission:", error);
  }
};