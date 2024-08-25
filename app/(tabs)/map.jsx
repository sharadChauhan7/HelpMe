// import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import MapView ,{Marker,Circle}from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const map = () => {
    let [mapRegion, setMapRegion] = useState({
        latitude: 27.4488793,
        longitude: 77.6877008,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={mapRegion => setMapRegion(mapRegion)}
      >
        <Marker coordinate={{ latitude: 27.4488793, longitude: 77.6877008 }} />
        <Circle
          center={{ latitude: 27.4488793, longitude: 77.6877008 }}
          radius={1000}
          fillColor={'rgba(220, 10, 10, 0.3)'}
        />
        </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
export default map