import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Accelerometer } from 'expo-sensors';
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

import images from '../constant/images.js';
import CustomButton from '../components/CustomButton.jsx';
import Loader from '../components/Loader.jsx';

import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { registerNNPushToken } from 'native-notify';

const Home = () => {

  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const EMERGENCY_SHAKE_TASK = 'EMERGENCY_SHAKE_TASK';

  TaskManager.defineTask(EMERGENCY_SHAKE_TASK, ({ data, error }) => {
    if (error) {
      console.error("TaskManager error:", error);
      return;
    }

    if (data) {
      const { x, y, z } = data.acceleration;

      if (!isEmergency && (x > 5 || y > 5 || z > 5)) {
        setIsEmergency(true);
        sendAlert();
      }
    }
  });

  useEffect(() => {
    const startBackgroundTask = async () => {
      try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(EMERGENCY_SHAKE_TASK);
        if (!isRegistered) {
          await BackgroundFetch.registerTaskAsync(EMERGENCY_SHAKE_TASK, {
            minimumInterval: 5, // Minimum time in seconds between background fetches
            stopOnTerminate: false, // Continue running when app is closed
          });
        }

        // Start the accelerometer to detect shakes
        const subscription = Accelerometer.addListener((acceleration) => {
          if (!isEmergency && (acceleration.x > 5 || acceleration.y > 5 || acceleration.z > 5)) {
            setIsEmergency(true);
            sendAlert();
          }
        });

        return () => subscription.remove(); // Cleanup on component unmount    
            
      } catch (err) {
        console.error("Background task registration failed:", err);
      }
    };

    startBackgroundTask();
  }, [isEmergency]);

  const sendAlert = async () => {
    try {
      console.log("Emergency detected");

      let data = {
        location: "demoLocation",
      };

      // let res = await axios.post('http://192.168.65.56:3000/getHelp', data);

      console.log("Gesture Activated");

      setTimeout(() => {
        setIsEmergency(false);
      }, 10000);

    } catch (err) {
      console.log("Error sending alert:", err.message);

      setTimeout(() => {
        setIsEmergency(false);
      }, 10000);
    }
  };

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
