import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Geolocation } from "@capacitor/geolocation";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 35.994, lng: -75.667 }; // Outer Banks Default Center

const locations = [
  { id: 1, name: "Jockey’s Ridge State Park", lat: 35.9606, lng: -75.6366 },
  { id: 2, name: "Wright Brothers National Memorial", lat: 36.0161, lng: -75.6684 },
  { id: 3, name: "Cape Hatteras Lighthouse", lat: 35.2512, lng: -75.528 },
];

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

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
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {/* User's Location Marker */}
        {userLocation && <Marker position={userLocation} label="You" />}

        {/* OBX Attractions Markers */}
        {locations.map((location) => (
          <Marker key={location.id} position={{ lat: location.lat, lng: location.lng }} label={location.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;