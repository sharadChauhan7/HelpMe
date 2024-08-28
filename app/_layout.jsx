// app/_layout.jsx (or RootLayout.jsx)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

// Auth
import {SessionProvider} from '../context/ctx';

const RootLayout = () => {
  // const [contacts, setContacts] = useState([]);
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // registerNNPushToken(23095,'t7U6tMbwevUKc9gC7Eddsf');


  const router = useRouter(); // Use useRouter from expo-router

  // Register Native Notify token
  // registerNNPushToken(23095, 't7U6tMbwevUKc9gC7Eddsf');
  // useEffect(() => {

  //   // Handle incoming notifications
  //   const subscription = Notifications.addNotificationResponseReceivedListener(response => {
  //     // console.log('Notification Data:', response.notification.request.content);
  //     const { screen } = response.notification.request.content.data;
  //     console.log(screen);
  //     if (screen) {
  //       // Navigate to the specific screen using Expo Router
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
})
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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="auto" />
    </SessionProvider>
    </>
  );
};

export default RootLayout;


