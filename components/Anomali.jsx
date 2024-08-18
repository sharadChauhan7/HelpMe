import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View } from 'react-native';

const Anomali = ({isTrue, isFalse}) => {
  const [modalVisible, setModalVisible] = useState(false);

  
  
  return (
    <View className="flex-1 items-center justify-center mt-6 bg-primary">
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View className="flex-1 items-center justify-center mt-6">
                    <View className="m-5 bg-white rounded-2xl justify-center items-center p-5  shadow-lg h-[30%] w-[80%]">

                        <Text className="mb-4 text-center text-3xl font-bold">Are you in any kind of danger?</Text>
                        <View className="flex flex-row w-full justify-center mt-6 items-center">
                            <Pressable
                                className="rounded-2xl p-4 bg-red-500 mx-4 w-1/3"
                                onPress={() => {setModalVisible(!modalVisible);isTrue();}}>
                                <Text className="text-white font-bold text-center text-xl ">Yes</Text>
                            </Pressable>
                            <Pressable
                                className="rounded-2xl p-4 bg-green-500 mx-4 w-1/3"
                                onPress={() => {setModalVisible(!modalVisible);isFalse();}}>
                                <Text className="text-white font-bold text-center text-xl ">No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Pressable Button */}


            <Pressable
                className="rounded-2xl p-2 bg-blue-500 active:bg-blue-700"
                visible={modalVisible}
                onPress={() => setModalVisible(true)}>

                <Text className="text-2xl text-white p-2 font-bold text-center ">Generate Alert</Text>
            </Pressable>
        </View>

  );
};

export default Anomali;
