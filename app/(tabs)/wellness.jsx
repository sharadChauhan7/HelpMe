import { View, Text,TouchableOpacity } from 'react-native'
import React ,{useState}from 'react'
import { styled } from 'nativewind';
import axios from 'axios';
import { useSession } from '../../context/ctx';
import { getLocation } from '../../util/permission';
import * as Location from 'expo-location';


const StyledTouchableOpacity = styled(TouchableOpacity);

const wellness = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const {session} = useSession();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  async function submit(){
    try{
        let userData = await axios.post('http://172.16.92.103:3000/api/auth/user',{token:session});
        userData = userData.data.user;
        
        userData.location = await getLocation(Location);
        let res = await axios.post('http://172.16.92.103:3000/api/help/wellness',userData);
        console.log("Wellness Activated");
    }
    catch(err){
        console.log("Error sending Wellness:", err.message);
    }
  }
  return (
    <View className="flex-1 items-center w-full h-1/2 justify-center mt-6 bg-primary">
        <Text className="text-3xl text-white font-bold">{isEnabled ? 'Wellness ON' : 'Wellness OFF'}</Text>
    <StyledTouchableOpacity
    onPress={()=>{toggleSwitch();submit();}}
    className={`flex-row items-center justify-between w-20 p-2 rounded-full ${
      isEnabled ? 'bg-green-500' : 'bg-red-400'
    }`}
  >

    <View
      className={`h-8 w-8 rounded-full bg-white shadow-lg transform ${
        isEnabled ? 'translate-x-8' : 'translate-x-0'
      }`}
    />
  </StyledTouchableOpacity>
  </View>
  )
}

export default wellness