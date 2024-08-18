import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import ButtonGradient from '../components/ButtonGradient'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../database/firebase'
import { initializeApp } from 'firebase/app'

const LogInScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            props.navigation.navigate('HomeScreen');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error al iniciar sesión' , errorCode, errorMessage);
        })
    }
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Subestación</Text>
    <Text style={styles.subtitle}>Bienvenido</Text>
    <TextInput
    value={email}
    onChangeText={(text) => setEmail(text) }
    placeholder='comision@cfe.com.mx'
    style={styles.textInput} />
    <TextInput
    value={password} 
    placeholder='Contraseña' 
    onChangeText={(text) => setPassword(text)}
    style={styles.textInput}
    secureTextEntry
    />
    <TouchableOpacity onPress={onPress}>        
    <Text style={styles.forgotpassword}>¿Olvidó su Contraseña?</Text>
    </TouchableOpacity>
    <ButtonGradient onPress={handleLogin}/>
    <StatusBar style='auto'/>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 70,
        color: '#34434D',
        fontWeight: 'bold',
        alignItems: 'center'


    }, 
    subtitle: {
        fontSize: 20, 
        color: '#gray'
    },
    textInput: { 
        padding: 10,
        paddiingStart: 40,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: '#FFF'
    },
    forgotpassword: {
        fontSize: 14,
        color: 'gray', 
        marginTop: 28
    }


})

export default LogInScreen