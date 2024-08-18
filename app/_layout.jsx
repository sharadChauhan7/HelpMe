import { View, Text ,StyleSheet} from 'react-native'
import {Stack,SplashScreen} from 'expo-router'
import React from 'react'
import { useEffect,useState } from 'react'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';


const RootLayout = () => {
  // console.log('RootLayout')
  const [contacts, setContacts] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);



    
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  
  useEffect(() => {
    if (error) throw error;
  
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  // useEffect(() => {
  //   registerNNPushToken(23095, 't7U6tMbwevUKc9gC7Eddsf');
  // }, []);
  
  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    // Use Stack
    <>
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
    </Stack>
      <StatusBar style="auto" />
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})