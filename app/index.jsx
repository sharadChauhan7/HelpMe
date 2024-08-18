import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import registerNNPushToken from 'native-notify';
const index = () => {
   registerNNPushToken(23095, 't7U6tMbwevUKc9gC7Eddsf');
  return (
    <View className='flex-1 items-center justify-center bg-black p-10 text-white '>
      <Text className='text-white text-3xl bg-[#f01d71]  p-5  mt-10'>My Home Page</Text>
      <Text className='text-4xl text-white my-5 font-psemibold'>Welcome to my  Page</Text>
      <Link href='/home' className='text-white border-4 border-red-600 text-3xl bg-[#f01d71] rounded-2xl p-5  mt-10'>Profile</Link>
    </View>
  )
}

export default index
