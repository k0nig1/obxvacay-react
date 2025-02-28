import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, InfoWindow, AdvancedMarkerElement } from "@react-google-maps/api";
import { attractions } from "../data/attractions";
import { Geolocation } from "@capacitor/geolocation";
import { IonSelect, IonSelectOption, IonButton, IonToast } from "@ionic/react";
import { MapItemCategory } from "../types/MapItemCategory";
import {requestLocationPermission} from "../utilities/requestLocationPermission";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 35.994, lng: -75.667 }; // Outer Banks default center

const libraries = ["marker"]; // Define libraries as a constant outside the component

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapItemCategory>(MapItemCategory.All);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const attractionMarkersRef = useRef<Map<number, google.maps.marker.AdvancedMarkerElement>>(new Map());

  /** Fetch User Location on Load */
  useEffect(() => {
    requestLocationPermission();
    getUserLocation();
  }, []);

  /** Function to Get User Location */
  const getUserLocation = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      setUserLocation({
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location: ", error);
      setErrorMessage("Could not access location. Please enable GPS.");
    }
  };

  useEffect(() => {
    if (!map || !window.google || !window.google.maps) return;

    // Add User's Location Marker
    if (userLocation) {
      if (!userMarkerRef.current) {
        userMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
          position: userLocation,
          map,
          title: "Your Location",
          icon: {
            url: "/icons/user-location.png", // Custom user marker icon
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });
      } else {
        userMarkerRef.current.position = userLocation;
        userMarkerRef.current.map = map;
      }
    }

    // Remove old attraction markers
    attractionMarkersRef.current.forEach((marker) => {
      if (marker.element && marker.element.parentNode) {
        marker.element.parentNode.removeChild(marker.element);
      }
    });
    attractionMarkersRef.current.clear();

    // Filter attractions based on category
    const filteredAttractions = attractions.filter(
      (attraction) => selectedCategory === MapItemCategory.All || attraction.category === selectedCategory
    );

    // Add markers for filtered attractions
    filteredAttractions.forEach((attraction) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: attraction.lat, lng: attraction.lng },
        map,
        title: attraction.name,
      });

      marker.addListener("click", () => {
        setSelectedAttraction(attraction);
      });

      attractionMarkersRef.current.set(attraction.id, marker);
    });

    return () => {
      // Cleanup: Remove all markers manually
      attractionMarkersRef.current.forEach((marker) => {
        if (marker.element && marker.element.parentNode) {
          marker.element.parentNode.removeChild(marker.element);
        }
      });
      attractionMarkersRef.current.clear();
    };
  }, [map, userLocation, selectedCategory]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      {/* Toast Notification for Errors */}
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage}
        duration={3000}
        onDidDismiss={() => setErrorMessage(null)}
      />

      {/* Category Filter */}
      <IonSelect
        value={selectedCategory}
        placeholder="Filter by Category"
        onIonChange={(e) => setSelectedCategory(e.detail.value as MapItemCategory)}
      >
        {Object.values(MapItemCategory).map((cat) => (
          <IonSelectOption key={cat} value={cat}>
            {cat}
          </IonSelectOption>
        ))}
      </IonSelect>

      {/* Find My Location Button */}
      <IonButton expand="full" onClick={getUserLocation} style={{ margin: "10px 0" }}>
        Find My Location
      </IonButton>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || center}
        zoom={12}
        options={{ mapId: import.meta.env.VITE_GOOGLE_MAPS_ID }}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* Custom Info Box for Selected Attraction */}
        {selectedAttraction && window.google && window.google.maps && (
          <div
            className="gm-ui-hover-effect"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0px 0px 6px rgba(0,0,0,0.3)",
              zIndex: 100,
            }}
          >
            <h3>{selectedAttraction.name}</h3>
            <p>{selectedAttraction.description}</p>
            <button onClick={() => setSelectedAttraction(null)}>Close</button>
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;