import { View, Text } from 'react-native'
import React from 'react'
// import Voice from 'react-native-voice';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import axios from 'axios';

const emergency = () => {
  //   const [results, setResults] = useState([]);
  // const [isListening, setIsListening] = useState(false);
  // const [helpCount, setHelpCount] = useState(0);
  // useEffect(() => {
  //   Voice.onSpeechResults = onSpeechResults;
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const onSpeechResults = (e) => {
  //   const newResults = e.value;
  //   setResults(newResults);
  //   checkForHelpWord(newResults);
  // };

  // const checkForHelpWord = (transcriptions) => {
  //   let count = helpCount;
    
  //   // Count occurrences of the word 'help' in the transcription
  //   transcriptions.forEach((transcription) => {
  //     const matches = transcription.toLowerCase().match(/\bhelp\b/g);
  //     if (matches) {
  //       count += matches.length;
  //     }
  //   });

  //   setHelpCount(count);

  //   if (count >= 3) {
  //     emergency();
  //   }
  // };

  const emergency = async () => {
      try{
        stopListening();
    console.log('Detected Help Call EMERGENCY!');
    let data = {
        location: "demoLocation",
      };

      let res = await axios.post('http://192.168.1.4:3000/getHelp', data);
      }
      catch(err){
          console.log(err);
      }
  };

  const startListening = () => {
    setIsListening(true);
    setHelpCount(0);
    Voice.start('en-US');
  };

  const stopListening = () => {
    setIsListening(false);
    Voice.stop();
  };
  return (
    <View>
      <Text>{isListening ? 'Listening...' : 'Press to start listening'}</Text>
      <Button title="Start Listening" onPress={startListening} />
      <Button title="Stop Listening" onPress={stopListening} />
    </View>
  )
}

export default emergency