import { useState, useEffect, useRef } from "react";
import { attractions } from "../data/attractions";
import { getDistanceFromLatLonInMiles } from "../utils/distanceUtils";

/**
 * Custom hook that monitors the user's location and triggers a geofencing alert
 * when the user is within 1 mile of any attraction.
 */
export const useGeofencing = (
  userLocation: { lat: number; lng: number } | null,
  geocoder: google.maps.Geocoder | null
) => {
  const [locationAlert, setLocationAlert] = useState<{
    attraction: any;
    position: google.maps.LatLng;
  } | null>(null);
  const alertedAttractionIds = useRef(new Set<number>());

  useEffect(() => {
    if (!userLocation || !geocoder) return;

    attractions.forEach((attraction) => {
      if (alertedAttractionIds.current.has(attraction.id)) return;
      geocoder.geocode({ address: attraction.address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const pos = results[0].geometry.location;
          const distance = getDistanceFromLatLonInMiles(
            userLocation.lat,
            userLocation.lng,
            pos.lat(),
            pos.lng()
          );
          if (distance <= 1) { // threshold set to 1 mile
            alertedAttractionIds.current.add(attraction.id);
            setLocationAlert({ attraction, position: pos });
          }
        }
      });
    });
  }, [userLocation, geocoder]);

  return { locationAlert, setLocationAlert };
};