// app/_layout.jsx (or RootLayout.jsx)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Linking,Alert } from 'react-native';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
// import * as Contacts from 'expo-contacts';
// import * as Location from 'expo-location';
// import { Accelerometer } from 'expo-sensors';
import axios from 'axios';

// import * as Notifications from 'expo-notifications';
// import registerNNPushToken from 'native-notify';
import { useRouter } from 'expo-router';
import registerNNPushToken from 'native-notify';
import * as Location from 'expo-location';
import { getPushDataObject } from 'native-notify';


// Auth
import {SessionProvider} from '../context/ctx';

const RootLayout = () => {
  // registerNNPushToken(23095, 't7U6tMbwevUKc9gC7Eddsf');
  let pushDataObject = getPushDataObject();
  useEffect(()=>{
    console.log(pushDataObject.link);
    // Parse pushDataObject from json string to object
    // pushDataObject = json.parse(pushDataObject);r
    async function redirect(){
      const supported = await Linking.canOpenURL(pushDataObject.link);
      if (supported) {
        Linking.openURL(pushDataObject.link);
      } else {
        Alert.alert(`Don't know how to open this URL: ${pushDataObject.link}`);
      }
    }
    redirect();
  },[pushDataObject])


  const router = useRouter(); // Use useRouter from expo-router

  // Register Native Notify token
  // useEffect(() => {

  //   // Handle incoming notifications
  //   const subscription = Notifications.addNotificationResponseReceivedListener(response => {
  //     // console.log('Notification Data:', response.notification.request.content);
  //     const { screen } = response.notification.request.content.data;
  //     console.log(screen);
  //     if (screen) {
  //       // Navigate to the specific screen using Expo Router
  //       con
  //       router.push('/emergency');
  //     }
  //   });

  //   return () => subscription.remove();
  // }, []);
  useEffect(()=>{
    (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
  })();
  // Request for background location permission
  // (async () => {
  //   let { status } = await Location.requestBackgroundPermissionsAsync();
  //   console.log("Granted")
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //     return;
  //   }
  // })();

},[])
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

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <>
    <SessionProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}  />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="auto" />
    </SessionProvider>
    </>
  );
};

export default RootLayout;


