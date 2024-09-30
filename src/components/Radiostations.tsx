import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonSpinner } from '@ionic/react';
import RadioBrowser from 'radio-browser'; 

const RadioStations: React.FC = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch radio stations using radio-browser package
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await RadioBrowser.getStations({
          by: 'country',
          country: 'United States', 
          state: 'North Carolina', 
          limit: 50,
        });

        // Filter the stations based on city and coordinates
        const filteredStations = response.filter((station: any) => 
          station.state.toLowerCase().includes('north carolina') &&
          (station.geo_lat > 35.0 && station.geo_lat < 36.5) // Coordinates for Outer Banks
        );
        setStations(filteredStations);
      } catch (error) {
        console.error('Error fetching radio stations:', error);
      }
      setLoading(false);
    };

    fetchStations();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Radio Stations - Norfolk & Outer Banks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonSpinner />
        ) : (
          <IonList>
            {stations.map((station: any) => (
              <IonItem key={station.stationuuid}>
                <IonLabel>
                  <h2>{station.name}</h2>
                  <p>{station.country}, {station.state}</p>
                </IonLabel>
                <IonButton fill="outline" slot="end" href={station.url_resolved} target="_blank">
                  Listen
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RadioStations;