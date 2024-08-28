import Anomali from '../../components/Anomali'
import React, { useState, useEffect } from 'react';
import {Voice} from 'react-native';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import {getLocation} from '../../util/permission'
import { Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from '../../context/ctx';
import axios from 'axios';



function home() {    
  const [errorMsg, setErrorMsg] = useState(null);
  const {session} = useSession();


    async function Emergency() {
        if(errorMsg){
            console.log(errorMsg);
            return;
        }
        console.log("Emergency");
        sendAlert();
        // console.log(contacts);
        
    }
    function FalseTrue() {

        console.log("FalseTrue");
    }
    const sendAlert = async () => {
      try {
        console.log("Emergency detected");
  
        let userData = await axios.post('http://192.168.1.4:3000/api/auth/user',{token:session});
        userData = userData.data.user;

        userData.location = await getLocation(Location);
        let res = await axios.post('http://192.168.1.4:3000/api/help/sos', userData);
        console.log(res);
  
        setTimeout(() => {
          // setIsEmergency(false);
        }, 10000);
  
      } catch (err) {
        console.log("Error sending alert:", err.message);
  
        setTimeout(() => {
          // setIsEmergency(false);
        }, 10000);
      }
    };

    return (
        // Your component UI
        <Anomali isTrue={Emergency} isFalse={FalseTrue} />
    );
}

export default home;