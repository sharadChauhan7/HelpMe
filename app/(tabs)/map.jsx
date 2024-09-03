import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polygon,Circle } from 'react-native-maps';
import { getLocation } from '../../util/permission';
import * as Location from 'expo-location';

const MapScreen = () => {



  const [mapRegion, setMapRegion] = useState({
    latitude: 27.4488793,
    longitude: 77.6877008,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    async function fetchCurrentLocation() {
      try {
        console.log("Fetching current location...");
        let location = await getLocation(Location);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Error fetching location: ", error);
      }
    }

    fetchCurrentLocation();
  }, []);




  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={(region) => setMapRegion(region)}
        showsUserLocation={true} // Add this to show the user's location
        followsUserLocation={true} // Add this to center on the user's location
      >   
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
