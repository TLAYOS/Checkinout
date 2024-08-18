import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import ButtonGradient from '../components/ButtonGradient'

const LogInScreen = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Bienvenido </Text>
    <Text style={styles.subtitle}>Subestación</Text>
    <TextInput
    placeholder='comision@cfe.com.mx'
    style={styles.textInput} />
    <TextInput 
    placeholder='Contraseña' 
    style={styles.textInput}
    />
    <TouchableOpacity onPress={onPress}>        
    <Text style={styles.forgotpassword}>¿Olvidó su Contraseña?</Text>
    </TouchableOpacity>
    <ButtonGradient />
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