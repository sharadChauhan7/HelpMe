import { View, Text } from 'react-native'
import React from 'react'
import Voice from 'react-native-voice';

const emergency = () => {
    const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const newResults = e.value;
    setResults(newResults);
    checkForEmergency(newResults);
  };

  const checkForEmergency = (transcriptions) => {
    const emergencyPhrase = 'help help help';
    const joinedTranscription = transcriptions.join(' ').toLowerCase();

    if (joinedTranscription.includes(emergencyPhrase)) {
      emergency();
    }
  };
  const emergency = () => {
    console.log('EMERGENCY!');
    // Add further emergency handling logic here
  };
  const startListening = () => {
    setIsListening(true);
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