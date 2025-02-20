import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { attractions } from "../data/attractions";
import { Geolocation } from "@capacitor/geolocation";
import { IonSelect, IonSelectOption } from "@ionic/react";
import { MapItemCategory } from "../types/MapItemCategory";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 35.994, lng: -75.667 }; // Outer Banks default center

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapItemCategory>(MapItemCategory.All);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const userMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const attractionMarkersRef = useRef<Map<number, google.maps.marker.AdvancedMarkerElement>>(new Map());

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setUserLocation({
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting location: ", error);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (!map || !window.google || !window.google.maps) return;

    // Add User's Location Marker
    if (userLocation) {
      if (!userMarkerRef.current) {
        userMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
          position: userLocation,
          map,
          title: "Your Location",
        });
      } else {
        userMarkerRef.current.map = map;
      }
    }

    // Remove old markers from DOM
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

    filteredAttractions.forEach((attraction) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: attraction.lat, lng: attraction.lng },
        map,
        title: attraction.name,
      });

      // Add click event listener
      marker.addListener("click", () => {
        setSelectedAttraction(attraction);
      });

      // Store marker reference
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
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["marker"]}>
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

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={{ mapId: import.meta.env.VITE_GOOGLE_MAPS_ID }} // Set Map ID correctly
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* Custom Info Box */}
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