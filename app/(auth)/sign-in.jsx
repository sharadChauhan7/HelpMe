// Create a sign in page for the user to sign in for an account
// This page will have a form for the user to fill out with their information
// This information will be stored in the database
// The user will be able to navigate to the sign in page from this page
// Use tailwind css for styling

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { Link } from 'expo-router';

// const SignIn = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = () => {
//         // Submit the form
//         console.log('Email:', email);
//         console.log('Password:', password);
//     };

//     return (
//         // Use tailwind css for styling
//         <View className='flex-1 items-center justify-center bg-black p-10 text-white'>
//             <Text className='text-white text-3xl bg-[#f01d71] p-5 mt-10'>Sign In</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder='Email'
//                 value={email}
//                 onChangeText={setEmail}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder='Password'
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//             />
//             <Button title='Sign In' onPress={handleSubmit} />
//             <Link href='/sign-up' className='text-white border-4 border-red-600 text-3xl bg-[#f01d71] rounded-2xl p-5 mt-10'>Sign Up</Link>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     input: {
//         backgroundColor: '#333',
//         color: 'white',
//         padding: 10,
//         margin: 10,
//         width: '100%',
//     },
// });

// export default SignIn;