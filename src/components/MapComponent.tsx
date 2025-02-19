import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
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

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
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

      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {/* User's Location Marker */}
        {userLocation && <Marker position={userLocation} label="You" />}

        {/* Filtered OBX Attractions */}
        {attractions
          .filter((attraction) => selectedCategory === MapItemCategory.All || attraction.category === selectedCategory)
          .map((attraction) => (
            <Marker
              key={attraction.id}
              position={{ lat: attraction.lat, lng: attraction.lng }}
              onClick={() => setSelectedAttraction(attraction)}
            />
          ))}

        {/* InfoWindow for Selected Attraction */}
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