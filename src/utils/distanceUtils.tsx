/**
 * Calculates the distance in miles between two geographic coordinates using the Haversine formula.
 */
export const getDistanceFromLatLonInMiles = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;
    return distanceKm * 0.621371;
  };
  
  /**
   * Checks if a given location is within the Outer Banks region (within 50 miles of the OBX center).
   */
  export const isInOBX = (location: { lat: number; lng: number }): boolean => {
    const center = { lat: 35.994, lng: -75.667 }; // OBX default center
    const distance = getDistanceFromLatLonInMiles(
      location.lat,
      location.lng,
      center.lat,
      center.lng
    );
    return distance <= 50;
  };