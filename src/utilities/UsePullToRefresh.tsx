import { useCallback } from "react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";

// Custom hook for pull-to-refresh functionality
export const usePullToRefresh = () => {
  // Function to handle pull-to-refresh action
  const handleRefresh = useCallback((event: CustomEvent) => {
    // Implement your reload or data fetching logic here
    window.location.reload(); // Reload the page or replace with custom logic
    event.detail.complete();  // Signal that refresh is complete
  }, []);

  // Return the IonRefresher component
  const PullToRefresh = () => (
    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
      <IonRefresherContent pullingText="Pull to refresh" refreshingSpinner="crescent" />
    </IonRefresher>
  );

  return PullToRefresh;
};