import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { storage } from '../database/firebase'; 
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UploadPostScreen = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadMedia = async () => {
        setUploading(true);
        try {
            let blob;
    
            if (Platform.OS === 'web') {
                const response = await fetch(image);
                blob = await response.blob();
            } else {
                const { uri } = await FileSystem.getInfoAsync(image);
                blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        console.error(e);
                        reject(new TypeError('Fallo de red'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });
            }
    
            const filename = image.substring(image.lastIndexOf('/') + 1);
            const storageRef = ref(storage, `images/${filename}`);
    
            await uploadBytes(storageRef, blob);
    
            // Close the blob only on non-web platforms
            if (Platform.OS !== 'web') {
                blob.close();
            }
    
            const downloadURL = await getDownloadURL(storageRef);
            setUploading(false);
            Alert.alert('Aviso', 'Imagen subida con éxito');
            setImage(null);
        } catch (error) {
            console.error(error);
            setUploading(false);
            Alert.alert('Error', 'Hubo un problema al subir la imagen');
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectbutton} onPress={pickImage}>
                <Text style={styles.buttontext}>Seleccione una imagen</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 300, height: 300 }}
                    />
                )}
                <TouchableOpacity style={styles.uploadbutton} onPress={uploadMedia}>
                    <Text style={styles.buttontext}>Guardar imagen</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectbutton: {
        borderRadius: 50,
        width: 150,
        height: 150,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontext: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    uploadbutton: {
        borderRadius: 50,
        width: 150,
        height: 150,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
});

export default UploadPostScreen;
