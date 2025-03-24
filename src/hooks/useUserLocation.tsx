import { useState, useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";

/**
 * Custom hook for obtaining the user's current location using Capacitor Geolocation.
 */
export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt");

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationPermission("granted");
      } catch (error) {
        console.error("Geolocation error:", error);
        setLocationPermission("denied");
        setErrorMessage("Unable to retrieve location. Please check permissions.");
      }
    };

    getUserLocation();
  }, []);

  // Watch for location updates
  useEffect(() => {
    const watchId = Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    });
    return () => {
      watchId.then(id => Geolocation.clearWatch({ id }));
    };
  }, []);

  return { userLocation, errorMessage, locationPermission };
};