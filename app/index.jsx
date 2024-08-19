import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Import useRouter from expo-router
import registerNNPushToken from 'native-notify';
import { Accelerometer } from 'expo-sensors';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

const Home = () => {
  const [isEmergency, setIsEmergency] = useState(false);


  useEffect(() => {
    const handleShake = (acceleration) => {
      if (!isEmergency && (acceleration.x > 5 || acceleration.y > 5 || acceleration.z > 5)) {
        setIsEmergency(true);
        sendAlert();
      }
    };

    const subscription = Accelerometer.addListener(handleShake);
    return () => subscription.remove();
  }, [isEmergency]);

  const sendAlert = async () => {
    try {
      console.log("Emergency");

      let data = {
        location: "demoLocation",
      };

      let res = await axios.post('http://192.168.1.4:3000/getHelp', data);
      console.log(res);

      setTimeout(() => {
        setIsEmergency(false);
      }, 10000);

    } catch (err) {
      console.log(err.message);

      setTimeout(() => {
        setIsEmergency(false);
      }, 10000);
    }
  };

  return (
    <View className='flex-1 items-center justify-center bg-black p-10'>
      <Text className='text-white text-3xl bg-[#f01d71] p-5 mt-10'>
        My Home Page
      </Text>
      <Text className='text-4xl text-white my-5 font-semibold'>
        Welcome to my Page
      </Text>
      <Link
        href="/home"
        className='text-white border-4 border-red-600 text-3xl bg-[#f01d71] rounded-2xl p-5 mt-10'
      >
        Profile
      </Link>
    </View>
  );
};

export default Home;
