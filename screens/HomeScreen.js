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
    const naviPosts = () => {
        props.navigation.navigate('PostsScreen');
    }
    const naviFeed = () => {
        props.navigation.navigate('PostsListScreen');
    }
    const naviCheckin = () => {
        props.navigation.navigate('CheckInScreen');
    }
  return (
    <View style={styles.container}>
    <ButtonLogOut onPress={handleLogout}/>
    <TouchableOpacity style={styles.uploadButton} onPress={navigateToUploadPost}>
        <Text style={styles.buttonText}>Guardar Imagen</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.uploadButton} onPress={naviPosts}>
        <Text style={styles.buttonText}>Crear Anuncios</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.uploadButton} onPress={naviFeed}>
        <Text style={styles.buttonText}>Ver Anuncios</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.uploadButton} onPress={naviCheckin}>
        <Text style={styles.buttonText}>Registro de entrada</Text>
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
        borderRadius: 50,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeScreen