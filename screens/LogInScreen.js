import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, Keyboard } from 'react-native'
import ButtonGradient from '../components/ButtonGradient'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../database/firebase'


const LogInScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                props.navigation.replace('HomeScreen');
            }
        });
        return unsubscribe;
    }, []);

    const handleLogin = () => {
        console.log('Apretó el Buton'); // Check if the function is triggered
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User logged in successfully:', userCredential.user);
            props.navigation.navigate('HomeScreen');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error al iniciar sesión' , errorCode, errorMessage);
            Alert.alert(`Login failed: ${errorMessage}`);
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Subestación</Text>
            <Text style={styles.subtitle}>Bienvenido</Text>
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='comision@cfe.com.mx'
                style={styles.textInput}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                value={password}
                placeholder='Contraseña'
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
                secureTextEntry
                returnKeyType='done'
                onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity onPress={() => { /* Handle forgot password */ }}>
                <Text style={styles.forgotpassword}>¿Olvidó su Contraseña?</Text>
            </TouchableOpacity>
            <ButtonGradient onPress={handleLogin} />
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
        color: 'gray'
    },
    textInput: { 
        padding: 10,
        paddingStart: 40,
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
