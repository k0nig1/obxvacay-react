import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { attractions } from "../data/attractions";
import { Geolocation } from "@capacitor/geolocation";
import { IonButton, IonToast } from "@ionic/react";
import { MapItemCategory } from "../types/MapItemCategory";
import { Library } from "@googlemaps/js-api-loader";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 35.994, lng: -75.667 }; // Outer Banks default center
const libraries: Library[] = ["places"]; // Use "places" for better geolocation support

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapItemCategory>(
    MapItemCategory.All
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [locationPermission, setLocationPermission] = useState<
    "granted" | "denied" | "prompt"
  >("prompt");

  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const attractionMarkersRef = useRef<Map<number, google.maps.Marker>>(
    new Map()
  );

  /** 📍 Function to Get User Location */
  const getUserLocation = async () => {
    try {
      const permStatus = await Geolocation.checkPermissions();

      if (permStatus.location === "denied") {
        setLocationPermission("denied");
        setErrorMessage(
          "Location permission denied. You can enable it in settings."
        );
        return;
      }

      if (permStatus.location !== "granted") {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location !== "granted") {
          setLocationPermission("denied");
          setErrorMessage("Location access is required for this feature.");
          return;
        }
        setLocationPermission("granted");
      }

      const coordinates = await Geolocation.getCurrentPosition();
      setUserLocation({
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMessage("Could not access location. Ensure GPS is enabled.");
    }
  };

  useEffect(() => {
    if (map) {
      console.log("Map loaded successfully");
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      console.log("Adding markers to the map");
      attractions
        .filter(
          (attraction) =>
            selectedCategory === MapItemCategory.All ||
            attraction.category === selectedCategory
        )
        .forEach((attraction) => {
          const marker = new google.maps.Marker({
            position: { lat: attraction.lat, lng: attraction.lng },
            map: map,
            title: attraction.name,
          });
          marker.addListener("click", () => {
            setSelectedAttraction(attraction);
          });
          attractionMarkersRef.current.set(attraction.id, marker);
        });
    }
  }, [map, selectedCategory]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      {/* 🚨 Toast Notification for Errors */}
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage || ""}
        duration={3000}
        onDidDismiss={() => setErrorMessage(null)}
      />

      {/* 📍 "Find My Location" Button */}
      <IonButton
        expand="full"
        onClick={getUserLocation}
        style={{ margin: "10px 0" }}
      >
        Find My Location
      </IonButton>

      {/* 🌍 Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || center}
        zoom={12}
        options={{ mapId: import.meta.env.VITE_GOOGLE_MAPS_ID }}
        onLoad={(mapInstance) => {
          console.log("Google Map loaded");
          setMap(mapInstance);
        }}
      >
        {/* 📍 User's Location Marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            title="Your Location"
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Default Google Maps icon
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}

        {/* 📌 Markers for Attractions */}
        {map &&
          attractions
            .filter(
              (attraction) =>
                selectedCategory === MapItemCategory.All ||
                attraction.category === selectedCategory
            )
            .map((attraction) => {
              // console.log("Adding marker for attraction:", attraction);
              return (
                <Marker
                  key={attraction.id}
                  position={{ lat: attraction.lat, lng: attraction.lng }}
                  title={attraction.name}
                  onClick={() => setSelectedAttraction(attraction)}
                />
              );
            })}

        {/* 🏷 InfoWindow for Selected Attraction */}
        {selectedAttraction && (
          <InfoWindow
            position={{
              lat: selectedAttraction.lat,
              lng: selectedAttraction.lng,
            }}
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
