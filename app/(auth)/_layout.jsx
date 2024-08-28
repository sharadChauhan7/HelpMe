import React from 'react'
import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import Loader from '../../components/Loader'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'

const AuthLayout = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
    <Stack 

    screenOptions={{
      headerShown:false,
    }}
    options={{
      headerShown: false,
    }}
    >
    <Stack.Screen
      name="sign-in"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="sign-up"
      options={{
        headerShown: false,
      }}
    />
  </Stack>

  <Loader isLoading={loading} />
  <StatusBar backgroundColor="#161622" style="light" />
</>
  )
}

export default AuthLayout