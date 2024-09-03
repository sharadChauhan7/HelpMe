import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import {Tabs ,Redirect} from 'expo-router'
import  icons  from "../../constant/icons";
import { StatusBar } from "expo-status-bar";

import { useState } from "react";
import { Loader } from "../../components/Loader";
import { useSession } from '../../context/ctx';
// import { useSession } from '../context/ctx.jsx';
import { getLocation } from '../../util/permission';
import * as Location from 'expo-location';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import axios from 'axios';
import { useEffect } from 'react';


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
   // const [isEmergency, setIsEmergency] = useState(false);
  // Make isEmergency with use refrence
  const isEmergency = useRef(false);
  const [loading, setLoading] = useState(false);
  // let accelerometerSubscription = null;
  const router = useRouter();


  const EMERGENCY_SHAKE_TASK = 'EMERGENCY_SHAKE_TASK';

  const { session, isLoading,signOut } = useSession();
  const sendAlert = async () => {

    if (isEmergency.current) return;
    // isEmergency
    isEmergency.current = true;
    try {
      // console.log("Emergency detected");
      console.log(isEmergency.current);
      let data = {
        location: "demoLocation",

      };
      console.log("Session " + session);
      // setIsEmergency(true);  
      let userData = await axios.post('http://172.16.92.103:3000/api/auth/user',{token:session});
        userData = userData.data.user;
      console.log(userData);
      userData.location = await getLocation(Location);
      let res = await axios.post('http://172.16.92.103:3000/api/help/sos', userData);

      console.log("Gesture ref Activated");

      // await sleep(10000);
      setTimeout(() => {
        // setIsEmergency(false);
        isEmergency.current = false;
      }, 10000);

    } catch (err) {
      console.log("Error sending alert:", err.message);

      setTimeout(() => {
        // setIsEmergency(false);
        isEmergency.current = false;
      }, 10000);
    }
  };
  useEffect(() => {
    // Start the accelerometer listener when the component mounts
    const subscription = Accelerometer.addListener((acceleration) => {
      if (!isEmergency.current && (acceleration.x > 5 || acceleration.y > 5 || acceleration.z > 5)) {
        sendAlert();
      }
    });

    return () => subscription.remove(); // Clean up the listener when the component unmounts
  }, []);
  // testing above 

  // const { session, isLoading,signOut } = useSession();
  console.log("Layout"+session);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) return <Redirect href="/sign-in" />;

  return (
    <>
    <SafeAreaView className="bg-primary h-full">

      <View><Button title="Sign Out" onPress={signOut} /></View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
          headerShown:false,
        }}
        >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
              />
            ),
          }}
          />
        <Tabs.Screen
          name="emergency"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
              />
            ),
          }}
          />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
              icon={icons.profile}
              color={color}
              name="Map"
              focused={focused}
              />
            ),
          }}
          />
      </Tabs>

      {/* <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" /> */}
      </SafeAreaView>
    </>)
}

export default TabLayout