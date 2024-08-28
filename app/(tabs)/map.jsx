// import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import MapView ,{Marker,Circle}from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import {getLocation} from '../../util/permission'
import * as Location from 'expo-location';

const map = () => {

    useEffect(()=>{
      async function currLocation(){
        console.log("currLocation");
        let location = await getLocation(Location);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
      currLocation();
    },[]);
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
        <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} />
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