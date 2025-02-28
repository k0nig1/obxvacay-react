import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, InfoWindow, AdvancedMarkerElement } from "@react-google-maps/api";
import { attractions } from "../data/attractions";
import { Geolocation } from "@capacitor/geolocation";
import { IonSelect, IonSelectOption, IonButton, IonToast } from "@ionic/react";
import { MapItemCategory } from "../types/MapItemCategory";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 35.994, lng: -75.667 }; // Outer Banks default center
const libraries = ["marker"]; // Define libraries as a constant outside the component

const MapComponent: React.FC = () => {
  // 🔹 State for storing user location
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  // 🔹 State for error messages (used in toast notifications)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🔹 Other existing state
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapItemCategory>(MapItemCategory.All);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const attractionMarkersRef = useRef<Map<number, google.maps.marker.AdvancedMarkerElement>>(new Map());

  /** 📍 Function to Request Location Permissions */
  const requestLocationPermission = async () => {
    try {
      const permStatus = await Geolocation.requestPermissions();

      if (permStatus.location === "granted") {
        console.log("Location permission granted");
        getUserLocation(); // 🔹 Fetch location after permission is granted
      } else {
        console.warn("Location permission denied");
        setErrorMessage("Location access is required for the best experience.");
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
      setErrorMessage("An error occurred while requesting location permissions.");
    }
  };

  /** 📍 Function to Get User Location */
  const getUserLocation = async () => {
    try {
      const permStatus = await Geolocation.checkPermissions();

      if (permStatus.location !== "granted") {
        console.warn("Location permission is not granted");
        setErrorMessage("Location permission is required to show your position.");
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

  /** 🔄 Run Once on Component Mount */
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      {/* 🚨 Toast Notification for Errors */}
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage || undefined}
        duration={3000}
        onDidDismiss={() => setErrorMessage(null)}
      />

      {/* 📍 "Find My Location" Button */}
      <IonButton expand="full" onClick={getUserLocation} style={{ margin: "10px 0" }}>
        Find My Location
      </IonButton>

      {/* 🌍 Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || center}
        zoom={12}
        options={{ mapId: import.meta.env.VITE_GOOGLE_MAPS_ID }}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* 📍 User's Location Marker */}
        {userLocation && (
          <AdvancedMarkerElement
            position={userLocation}
            title="Your Location"
          />
        )}

        {/* 📌 Markers for Attractions */}
        {attractions
          .filter((attraction) => selectedCategory === MapItemCategory.All || attraction.category === selectedCategory)
          .map((attraction) => (
            <AdvancedMarkerElement
              key={attraction.id}
              position={{ lat: attraction.lat, lng: attraction.lng }}
              title={attraction.name}
              onClick={() => setSelectedAttraction(attraction)}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;