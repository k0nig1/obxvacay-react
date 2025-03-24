import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker } from "@react-google-maps/api";
import { IonButton, IonToast, IonAlert } from "@ionic/react";
import { Capacitor } from "@capacitor/core";
import "./MapComponent.css";

import { attractions } from "../data/attractions";
import { MapItemCategory } from "../types/MapItemCategory";
const ALL_CATEGORY = "All" as unknown as MapItemCategory;
import MapControls from "./MapControls";
import { useUserLocation } from "../hooks/useUserLocation";
import { useGeofencing } from "../hooks/useGeofencing";
import { getDistanceFromLatLonInMiles, isInOBX } from "../utils/distanceUtils";

// Default OBX center coordinates and libraries configuration
const center = { lat: 35.994, lng: -75.667 };
type Library = "places" | "drawing" | "geometry";
const libraries: Library[] = ["places"];

const MapComponent: React.FC = () => {
  // Use custom hook for user location
  const { userLocation, errorMessage: initialErrorMessage } = useUserLocation();
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [selectedCategories, setSelectedCategories] = useState<MapItemCategory[]>([]);
  const [searchRadius, setSearchRadius] = useState<number>(50);
  const [categoriesCollapsed, setCategoriesCollapsed] = useState<boolean>(true);
  const [pendingAddress, setPendingAddress] = useState<string | null>(null);
  const [showMapsAlert, setShowMapsAlert] = useState(false);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const userLocationRef = useRef(userLocation);
  
  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  // Use custom hook for geofencing
  const { locationAlert, setLocationAlert } = useGeofencing(userLocation, geocoder);

  // Ref for managing attraction markers
  const attractionMarkersRef = useRef<Map<number, google.maps.Marker>>(new Map());

  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "400px",
    position: "relative",
  };

  /**
   * Opens the provided address in the appropriate maps app.
   */
  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const platform = Capacitor.getPlatform();
    if (platform === "ios") {
      const url = `http://maps.apple.com/?q=${encodedAddress}`;
      window.open(url, "_blank");
    } else if (platform === "android") {
      setPendingAddress(address);
      setShowMapsAlert(true);
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      window.open(url, "_blank");
    }
  };

  // Resize map on load to ensure proper rendering
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        google.maps.event.trigger(map, "resize");
      }, 300);
    }
  }, [map]);

  // Add attraction markers based on selected category and search radius
  useEffect(() => {
    if (map && geocoder) {
      attractionMarkersRef.current.forEach(marker => marker.setMap(null));
      attractionMarkersRef.current.clear();

      const attractionPromises = attractions.map((attraction) => {
        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(ALL_CATEGORY) ||
          (attraction.category !== undefined && selectedCategories.includes(attraction.category));

        return new Promise<{ shouldAdd: boolean; attraction: typeof attraction }>((resolve) => {
          if (!userLocation) {
            resolve({ shouldAdd: categoryMatch, attraction });
          } else {
            const refLocation = userLocation && isInOBX(userLocation) ? userLocation : center;
            geocoder.geocode({ address: attraction.address }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                const pos = results[0].geometry.location;
                const distance = getDistanceFromLatLonInMiles(
                  refLocation.lat,
                  refLocation.lng,
                  pos.lat(),
                  pos.lng()
                );
                resolve({
                  shouldAdd: categoryMatch && distance <= searchRadius,
                  attraction,
                });
              } else {
                resolve({ shouldAdd: false, attraction });
              }
            });
          }
        });
      });

      Promise.all(attractionPromises).then((results) => {
        results.forEach(({ shouldAdd, attraction }) => {
          if (shouldAdd) {
            geocoder.geocode({ address: attraction.address }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                const position = results[0].geometry.location;
                const marker = new google.maps.Marker({
                  position,
                  map: map,
                  title: attraction.name,
                });
                marker.addListener("click", () => {
                  setSelectedAttraction({ ...attraction, position });
                });
                attractionMarkersRef.current.set(attraction.id, marker);
              }
            });
          }
        });
      });
    }
  }, [map, selectedCategories, userLocation, searchRadius, geocoder]);

  return (
    <>
      <div style={{ margin: "10px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <label>
          Radius:
          <select value={searchRadius} onChange={(e) => setSearchRadius(Number(e.target.value))}>
            {[5, 10, 25, 50].map((mile) => (
              <option key={mile} value={mile}>
                {mile} miles
              </option>
            ))}
          </select>
        </label>
        <IonButton
          size="small"
          onClick={() => setCategoriesCollapsed(!categoriesCollapsed)}
        >
          {categoriesCollapsed ? "Show Categories" : "Hide Categories"}
        </IonButton>
        {!categoriesCollapsed && (
          <>
            {Object.values(MapItemCategory).map((cat) => (
              <IonButton
                key={cat}
                size="small"
                fill={selectedCategories.includes(cat) ? "solid" : "outline"}
                onClick={() => {
                if (cat === ALL_CATEGORY) {
                    if (selectedCategories.includes(ALL_CATEGORY)) {
                      setSelectedCategories([]);
                    } else {
                      setSelectedCategories([ALL_CATEGORY]);
                    }
                  } else {
                    // For other categories, remove ALL_CATEGORY if it's selected
                    let newSelection = selectedCategories.filter(c => c !== ALL_CATEGORY);
                    if (newSelection.includes(cat)) {
                      newSelection = newSelection.filter(c => c !== cat);
                    } else {
                      newSelection = [...newSelection, cat];
                    }
                    setSelectedCategories(newSelection);
                  }
                }}
              >
                {cat}
              </IonButton>
            ))}
          </>
        )}
      </div>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation && isInOBX(userLocation) ? userLocation : center}
          zoom={12}
          options={{
            mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
            disableDefaultUI: false,
            zoomControl: true,
            fullscreenControl: false,
            streetViewControl: false,
          }}
          onLoad={(mapInstance) => {
            setMap(mapInstance);
            if (window.google && window.google.maps) {
              setGeocoder(new window.google.maps.Geocoder());
            }
          }}
        >
          <MapControls map={map} userLocationRef={userLocationRef} />
          {userLocation && window.google && window.google.maps && (
            <Marker
              key={`user-location-${userLocation.lat}-${userLocation.lng}`}
              position={userLocation}
              title="Your Location"
              zIndex={9999}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
          {selectedAttraction && selectedAttraction.position && (
            <InfoWindow
              position={selectedAttraction.position}
              onCloseClick={() => setSelectedAttraction(null)}
            >
              <div>
                <h3>{selectedAttraction.name}</h3>
                <p>{selectedAttraction.description}</p>
                <IonButton
                  expand="block"
                  size="small"
                  onClick={() => openInMaps(selectedAttraction.address)}
                >
                  Open in Maps
                </IonButton>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage || ""}
        duration={3000}
        onDidDismiss={() => setErrorMessage(null)}
      />
      <IonAlert
        isOpen={!!locationAlert}
        header={`You're near ${locationAlert?.attraction.name}!`}
        message={`Would you like to check out activities here?`}
        buttons={[
          {
            text: "Yes",
            handler: () => {
              setSelectedAttraction({ ...locationAlert?.attraction, position: locationAlert?.position });
              setLocationAlert(null);
            },
          },
          {
            text: "No",
            role: "cancel",
            handler: () => setLocationAlert(null),
          },
        ]}
      />
      <IonAlert
        isOpen={showMapsAlert}
        onDidDismiss={() => setShowMapsAlert(false)}
        header="Open in Maps"
        message="Which maps app would you like to use?"
        buttons={[
          {
            text: "Google Maps App",
            handler: () => {
              if (pendingAddress) {
                const encoded = encodeURIComponent(pendingAddress);
                window.open(`geo:0,0?q=${encoded}`, "_blank");
              }
            },
          },
          {
            text: "Browser",
            handler: () => {
              if (pendingAddress) {
                const encoded = encodeURIComponent(pendingAddress);
                window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, "_blank");
              }
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ]}
      />
    </>
  );
};

export default MapComponent;