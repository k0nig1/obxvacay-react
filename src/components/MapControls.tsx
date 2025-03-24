import React, { useEffect } from "react";

interface MapControlsProps {
  map: google.maps.Map | null;
  userLocationRef: React.MutableRefObject<{ lat: number; lng: number } | null>;
}

/**
 * MapControls component adds custom controls (e.g., a re-center button)
 * to the Google Map.
 */
const MapControls: React.FC<MapControlsProps> = ({ map, userLocationRef }) => {
  useEffect(() => {
    if (!map) return;
    if (window.google && window.google.maps) {
      const controlDiv = document.createElement("div");
      controlDiv.style.margin = "10px";

      const controlUI = document.createElement("button");
      controlUI.style.backgroundColor = "#fff";
      controlUI.style.border = "none";
      controlUI.style.outline = "none";
      controlUI.style.width = "40px";
      controlUI.style.height = "40px";
      controlUI.style.borderRadius = "2px";
      controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      controlUI.style.cursor = "pointer";
      controlUI.title = "Center map on your location";

      const controlIcon = document.createElement("img");
      controlIcon.src = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      controlIcon.style.width = "100%";
      controlIcon.style.height = "100%";

      controlUI.appendChild(controlIcon);
      controlDiv.appendChild(controlUI);

      controlUI.addEventListener("click", () => {
        if (userLocationRef.current) {
          map.setCenter(userLocationRef.current);
          map.setZoom(14); // Closer focus
        }
      });

      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
    }
  }, [map, userLocationRef]);
  return null;
};

export default MapControls;