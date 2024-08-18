import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
import ButtonLogOut from '../components/ButtonLogOut'

const HomeScreen = (props) => {
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            props.navigation.navigate('LogInScreen');
        }).catch((error) => {
            console.error('Error al cerrar sesión', error);
        })
    }
  return (
    <View>
    <ButtonLogOut onPress={handleLogout}/>
    <StatusBar style= 'auto' />
    </View>
  )
}

export default HomeScreen