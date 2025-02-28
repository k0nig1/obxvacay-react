import { Geolocation } from "@capacitor/geolocation";

const getUserLocation = async () => {
  try {
    const permStatus = await Geolocation.checkPermissions();

    if (permStatus.location !== "granted") {
      console.warn("Location permission is not granted");
      return;
    }

    const coordinates = await Geolocation.getCurrentPosition();
    setUserLocation({
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    });
  } catch (error) {
    console.error("Error getting location:", error);
    setErrorMessage("Could not access location. Please enable GPS.");
  }
};