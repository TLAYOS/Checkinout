import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, StyleSheet, View, SafeAreaView, Button, Alert, TouchableHighlight, Platform } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { db } from '../database/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const CheckInScreen = () => {

    const [biometricSupport, setBiometricSupport] = useState(false);

    //boimetric scan
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setBiometricSupport(compatible);
        })();
            
        
    });

    const fallBackToDefaultAuth = () => {
        console.log('No hay biometricos para autenticar');
    };

    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
            {
                text:btnTxt,
                onPress:btnFunc,
            }
        ]);
    };

    const twoButtonAlert = () => 
        Alert.alert('Checaste tu entrada', [
            {
                text: 'Back',
                onPress: () => console.log('Checkeo cancelado'),
                style: 'cancel'
            },
        ]);

        const handleBiometricAuth = async () => {
            //revision de hardware
            const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

            //regreso a patron, pin o contraseña de no tenerlo
            if(!isBiometricAvailable)
                return alertComponent(
                    'Favor de ingresar su confirmación',
                    'Su dispositivo no soporta autorizacion biometrica',
                    'Ok',
                    () => fallBackToDefaultAuth()
            );

            //revisar tipos de biometricos disponibles 1043
            let supportedBiometrics;
            if (isBiometricAvailable)
                supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
            //Revisar biometricos almacenados en el dispositivo
            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            if (!savedBiometrics)
                return alertComponent(
                    'No existe registro de biometricos',
                    'Porfavor use su contraseña',
                    'Ok',
                    () => fallBackToDefaultAuth()
                );

                //Autentifiaccion con Biometricos
                const biometricAuth = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Checkeo con Biometricos',
                    cancelLabel: 'cancel',
                    disableDeviceFallback: false,
                });

                
                try {
                    const biometricAuth = await LocalAuthentication.authenticateAsync({
                        promptMessage: 'Confirmacion con firma digital',
                        cancelLabel: 'Cancel',
                        disableDeviceFallback: false, 
                    });
                
                    // Exitus
                    if (biometricAuth.success) {
                        Alert.alert('Autentifiacion Lograda', 'Tu entrada fue registrada!');
                        
                        
                        await addDoc(collection(db, 'entrada'), {
                            timestamp: serverTimestamp(),                            
                        });
            
                        console.log('Timestamp saved successfully!');
                    } else {
                        Alert.alert('Fallo en autentificacion', 'Intente de nuevo');
                    }
                } catch (error) {
                    console.error('Biometric authentication error:', error);
                }
        };

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text>
                {biometricSupport
                ? 'Tu dispositivo es compatible con Biometricos'
                : 'Escaner de rostro o huella dactilar esta disponible en este dispositivo'}
            </Text>
            <TouchableHighlight
            style={{
                height: 60,
                marginTop: 200
            }}
            >
            <Button
            title='Registrar entrada con biometricos'
            color='green'
            onPress={handleBiometricAuth} />

            </TouchableHighlight>
            <StatusBar style='auto'/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        paddingTop: StatusBar.currentHeight
    }
})

export default CheckInScreen