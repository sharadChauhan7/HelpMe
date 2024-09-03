import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Accelerometer } from 'expo-sensors';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

import images from '../constant/images.js';
import CustomButton from '../components/CustomButton.jsx';
import Loader from '../components/Loader.jsx';
import { useSession } from '../context/ctx.jsx';
import { getLocation } from '../util/permission.js';
import * as Location from 'expo-location';

import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { registerNNPushToken } from 'native-notify';

const Home = () => {

  // const [isEmergency, setIsEmergency] = useState(false);
  // Make isEmergency with use refrence
  const isEmergency = useRef(false);
  const [loading, setLoading] = useState(false);
  // let accelerometerSubscription = null;
  const router = useRouter();


  const EMERGENCY_SHAKE_TASK = 'EMERGENCY_SHAKE_TASK';

  // const { session, isLoading,signOut } = useSession();
  // const sendAlert = async () => {

  //   if (isEmergency.current) return;
  //   // isEmergency
  //   isEmergency.current = true;
  //   try {
  //     // console.log("Emergency detected");
  //     console.log(isEmergency.current);
  //     let data = {
  //       location: "demoLocation",

  //     };
  //     console.log("Session " + session);
  //     // setIsEmergency(true);  
  //     let userData = await axios.post('http://172.16.92.103:3000/api/auth/user',{token:session});
  //       userData = userData.data.user;
  //     console.log(userData);
  //     userData.location = await getLocation(Location);
  //     let res = await axios.post('http://172.16.92.103:3000/api/help/sos', userData);

  //     console.log("Gesture ref Activated");

  //     // await sleep(10000);
  //     setTimeout(() => {
  //       // setIsEmergency(false);
  //       isEmergency.current = false;
  //     }, 10000);

  //   } catch (err) {
  //     console.log("Error sending alert:", err.message);

  //     setTimeout(() => {
  //       // setIsEmergency(false);
  //       isEmergency.current = false;
  //     }, 10000);
  //   }
  // };
  // useEffect(() => {
  //   // Start the accelerometer listener when the component mounts
  //   const subscription = Accelerometer.addListener((acceleration) => {
  //     if (!isEmergency.current && (acceleration.x > 5 || acceleration.y > 5 || acceleration.z > 5)) {
  //       sendAlert();
  //     }
  //   });

  //   return () => subscription.remove(); // Clean up the listener when the component unmounts
  // }, []);

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <Loader isLoading={loading} />

        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex justify-center items-center h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless{"\n"}
                Possibilities with{" "}
                <Text className="text-secondary-200">Aora</Text>
              </Text>

              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a Journey of Limitless
              Exploration with Aora
            </Text>

            <CustomButton
              title="Continue"
              handlePress={() => router.push("/home")}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </>
  );
};

export default Home;