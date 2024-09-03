import { View, Text ,TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import { useEffect, useState,useRef } from 'react';
import {getLocation} from '../../util/permission'
import * as Location from 'expo-location';
import { useSession } from '../../context/ctx';
import { Button } from 'react-native';
import * as Speech from 'expo-speech';
import axios from 'axios';





const emergency = () => {

  const [results, setResults] = useState([]);
  const {session} = useSession();

  const [isListening, setIsListening] = useState(false);
  const [consecutiveHelpCount, setConsecutiveHelpCount] = useState(0); // To track consecutive 'help' in a row
  const [loading, setLoading] = useState(false);

  // Testing 
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    // Request permissions if necessary
    Speech.requestAndroidPermissions();
  }, []);


  const startSpeech = async () => {
    try {
      setIsListening(true);
      const result = await Speech.speakAsync('Start speaking', {
        language: 'en-US',
        rate: 0.75,
      });
      console.log('Started speaking');
      console.log(result);

      if (result.finished) {
        setRecognizedText(result.text);
      } else {
        console.log('Speech recognition was interrupted.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const stopSpeech = async () => {
    try {
      setIsListening(false);
      const result = await Speech.stop();
      console.log('Stopped speaking');
      console.log(recognizedText)
      if (result) {
        setRecognizedText('');
      }
    }
    catch (error) {
      console.error(error);
    }

  };


  // useEffect(() => {
  //   Voice.onSpeechResults = onSpeechResults;
  //   Voice.onSpeechError = onSpeechError;

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);
  // const onSpeechResults = (e) => {
  //   const newResults = e.value;
  //   setResults(newResults);
  //   checkForHelpSequence(newResults);
  // };

  // const onSpeechError = (e) => {
  //   // console.error('Speech Error: ', e.error);
  //   stopListening(); // Stop listening if there's an error
  // };

  // const checkForHelpSequence = (transcriptions) => {
  //   let count = consecutiveHelpCount;

  //   transcriptions.forEach((transcription) => {
  //     const words = transcription.toLowerCase().split(/\s+/); 

  //     words.forEach((word) => {
  //       if (word === 'help') {
  //         count += 1;
  //       } else {
  //         count = 0; 
  //       }

  //       if (count === 3) {
  //         emergency();
  //         count = 0; 
  //       }
  //     });
  //   });

  //   setConsecutiveHelpCount(count);
  // };

  const emergency = async () => {
      try{
        // stopListening();
        let data = {
          location: "demoLocation",
        };
        
        console.log('Detected Help Call EMERGENCY!-L62');
        let userData = await axios.post('http://172.16.92.103:3000/api/auth/user',{token:session});
        userData = userData.data.user;
        
        userData.location = await getLocation(Location);
        let res = await axios.post('http://172.16.92.103:3000/api/help/sos', userData);
        console.log("Emergency call sent");
      }
      catch(err){
          console.log(err);
      }
  };

  // const startListening = async () => {
  //   try {
  //     setIsListening(true);
  //     setConsecutiveHelpCount(0); // Reset count when starting listening
  //     await Voice.start('en-US');
  //   } catch (error) {
  //     console.error('Error starting Voice recognition:', error);
  //   }
  // };
  // const stopListening = () => {
  //   setIsListening(false);
  //   Voice.stop();
  // };

  return (
    <View  className='flex-1 justify-center items-center p-4 bg-primary'>
      <Text className='text-xl mb-4 text-white'>
        {isListening ? 'Listening...' : 'Press the button to start listening'}
      </Text>
      <TouchableOpacity
        onPress={isListening ? stopSpeech:startSpeech}
        className={`w-64 h-64 bg-red-500 rounded-full justify-center items-center ${isListening ? 'bg-red-500' : ''}`}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text className='text-white text-4xl font-bold'>
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default emergency