import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker } from "@react-google-maps/api"; // Use Marker instead of AdvancedMarkerElement
import { attractions } from "../data/attractions";
import { Geolocation } from "@capacitor/geolocation";
import { IonSelect, IonSelectOption, IonButton, IonToast } from "@ionic/react";
import { MapItemCategory } from "../types/MapItemCategory";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 35.994, lng: -75.667 }; // Outer Banks default center
const libraries: string[] = ["places"]; // Use "places" for better geolocation support

const MapComponent: React.FC = () => {
  // 🔹 State for storing user location
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  // 🔹 State for error messages (used in toast notifications)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🔹 Other existing state
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapItemCategory>(MapItemCategory.All);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const attractionMarkersRef = useRef<Map<number, google.maps.Marker>>(new Map());

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
        message={errorMessage || "En error occurred"}
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
          <Marker
            position={userLocation}
            title="Your Location"
            icon={{
              url: "/icons/user-location.png", // Use a custom user location icon
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}

        {/* 📌 Markers for Attractions */}
        {attractions
          .filter((attraction) => selectedCategory === MapItemCategory.All || attraction.category === selectedCategory)
          .map((attraction) => (
            <Marker
              key={attraction.id}
              position={{ lat: attraction.lat, lng: attraction.lng }}
              title={attraction.name}
              onClick={() => setSelectedAttraction(attraction)}
            />
          ))}

        {/* 🏷 InfoWindow for Selected Attraction */}
        {selectedAttraction && (
          <InfoWindow
            position={{ lat: selectedAttraction.lat, lng: selectedAttraction.lng }}
            onCloseClick={() => setSelectedAttraction(null)}
          >
            <div>
              <h3>{selectedAttraction.name}</h3>
              <p>{selectedAttraction.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;