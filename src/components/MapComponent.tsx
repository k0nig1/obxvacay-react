import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { attractions } from "../data/attractions";
import { Geolocation } from "@capacitor/geolocation";
import { IonButton, IonToast, IonAlert, IonIcon } from "@ionic/react";
import { MapItemCategory } from "../types/MapItemCategory";
import { getCategoryIconBase64 } from "../types/MapCategoryIcons";
import { Library } from "@googlemaps/js-api-loader";
import { Capacitor } from "@capacitor/core";
import { expandOutline, contractOutline } from "ionicons/icons";
import "./MapComponent.css";

const center = { lat: 35.994, lng: -75.667 }; // Outer Banks default center
const libraries: Library[] = ["places"]; // Use "places" for better geolocation support

const MapComponent: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
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
  const [showMapsAlert, setShowMapsAlert] = useState(false);
  const [pendingAddress, setPendingAddress] = useState<string | null>(null);
  const fullscreenControlDivRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        google.maps.event.trigger(map, "resize");
      }, 300); // Give layout time to apply
    }
  }, [isFullscreen, map]);

  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const attractionMarkersRef = useRef<Map<number, google.maps.Marker>>(
    new Map()
  );
  const mapContainerStyle: React.CSSProperties = isFullscreen
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: "env(safe-area-inset-top, 20px)",
        zIndex: 1,
      }
    : {
        width: "100%",
        height: "400px",
        position: "relative",
      };

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

  useEffect(() => {
    if (!map) return;

    // Clear any previously injected custom controls
    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].clear();

    if (fullscreenControlDivRef.current) {
      const controlDiv = fullscreenControlDivRef.current;
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
      controlDiv.style.display = "block";
    }
  }, [map, isFullscreen]);

  useEffect(() => {
    if (map) {
      console.log("Map loaded successfully");
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const geocoder = new window.google.maps.Geocoder();
      console.log("Adding markers to the map");
      attractions
        .filter(
          (attraction) =>
            selectedCategory === MapItemCategory.All ||
            attraction.category === selectedCategory
        )
        .forEach((attraction) => {
          geocoder.geocode(
            { address: attraction.address },
            (results, status) => {
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
              } else {
                console.error("Geocode failed for", attraction.name, status);
              }
            }
          );
        });
    }
  }, [map, selectedCategory]);

  return (
    <>
      <div ref={fullscreenControlDivRef} style={{ display: "none" }}>
        <div
          className="gm-control-active"
          style={{
            background: "#fff",
            border: "2px solid #ccc",
            borderRadius: "2px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            cursor: "pointer",
            margin: "10px",
            textAlign: "center",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsFullscreen(prev => !prev)}
        >
          <IonIcon icon={isFullscreen ? contractOutline : expandOutline} />
        </div>
      </div>
      {isFullscreen &&
        ReactDOM.createPortal(
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={userLocation || center}
              zoom={12}
              options={{
                mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
                disableDefaultUI: false,
                zoomControl: true,
                fullscreenControl: false,
                streetViewControl: false,
              }}
              onLoad={(mapInstance) => {
                console.log("Google Map loaded");
                setMap(mapInstance);
              }}
            >
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
          </LoadScript>,
          document.getElementById("map-overlay")!
        )}
      {!isFullscreen && (
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || center}
            zoom={12}
            options={{
              mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
              disableDefaultUI: false,
              zoomControl: true,
              fullscreenControl: false,
              streetViewControl: false,
            }}
            onLoad={(mapInstance) => {
              console.log("Google Map loaded");
              setMap(mapInstance);
            }}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                title="Your Location"
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
      )}
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage || ""}
        duration={3000}
        onDidDismiss={() => setErrorMessage(null)}
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
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encoded}`,
                  "_blank"
                );
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
