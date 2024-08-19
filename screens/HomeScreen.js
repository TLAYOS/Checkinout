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

    const navigateToUploadPost = () => {
        props.navigation.navigate('UploadPostScreen');
    }
    const navUsrDt = () => {
        props.navigation.navigate('UsersList');
    }
  return (
    <View style={styles.container}>
    <ButtonLogOut onPress={handleLogout}/>
    <TouchableOpacity style={styles.uploadButton} onPress={navigateToUploadPost}>
        <Text style={styles.buttonText}>Subir Anuncio</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.uploadButton} onPress={navUsrDt}>
        <Text style={styles.buttonText}>Lista de Usuarios</Text>
    </TouchableOpacity>
    <StatusBar style='auto' />
</View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeScreen