import React, { useState } from "react"
import { Text, TouchableOpacity, View,StyleSheet } from "react-native"

import Icon from "react-native-vector-icons/FontAwesome"

function AccordionItem({ children, title ,label}) {
  const [expanded, setExpanded] = useState(false)

  function toggleItem() {
    setExpanded(!expanded)
  }

  const body = <View className="p-4 mt-4 rounded-3xl border-4 border-gray-700">{children}</View>

  return (
    <>
    <Text className="text-base text-gray-100 font-pmedium mt-4 mb-2">{label}</Text>
    <View className="my-2 rounded-2xl">
      <TouchableOpacity className="p-3 rounded-2xl bg-black-100 flex flex-row justify-between" onPress={toggleItem}>
        <Text className=" text-base text-gray-100 font-pmedium">{title}</Text>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#bbb"
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
    </>
  )
}

  export default AccordionItem;
  