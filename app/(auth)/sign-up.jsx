

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleSubmit = () => {
        // Submit the form
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };
    
    return (
        // Use tailwind css for styling
        <View className='flex-1 items-center justify-center bg-black p-10 text-white'>
            <Text className='text-white text-3xl bg-[#f01d71] p-5 mt-10'>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title='Sign Up' onPress={handleSubmit} />
            <Link href='/sign-in' className='text-white border-4 border-red-600 text-3xl bg-[#f01d71] rounded-2xl p-5 mt-10'>Sign In</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#333',
        color: 'white',
        padding: 10,
        margin: 10,
        width: '100%',
    },
});

export default SignUp;