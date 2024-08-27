import Anomali from '../../components/Anomali'
import React, { useState, useEffect } from 'react';
import {Voice} from 'react-native';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';

import { Platform } from 'react-native';
import axios from 'axios';


function home() {
    // const [contacts, setContacts] = useState([]);

    
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
  
          if (data.length > 0) {
            setContacts(data);
          }
        }
      })();
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      })();
      
    }, []);

    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


    function Emergency() {
        if(errorMsg){
            console.log(errorMsg);
            return;
        }
        console.log("Emergency");
        sendAlert();
        // console.log(contacts);
        console.log(location);
    }
    function FalseTrue() {

        console.log("FalseTrue");
    }
    const sendAlert = async () => {
      try {
        console.log("Emergency detected");
  
        let data = {
          location: "demoLocation",
        };
  
        let res = await axios.post('http://192.168.1.4:3000/getHelp', data);
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