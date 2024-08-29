import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import {Tabs ,Redirect} from 'expo-router'
import  icons  from "../../constant/icons";
import { StatusBar } from "expo-status-bar";

import { useState } from "react";
import { Loader } from "../../components/Loader";
import { useSession } from '../../context/ctx';
import { SafeAreaView } from "react-native-safe-area-context";


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
  const { session, isLoading,signOut } = useSession();

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
          name="profile"
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