import React from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const ButtonGradient = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
    <LinearGradient 
    style={styles.button}
    colors={['#F9D6B5', '#249808']}
    start={{x: 1, y: 0}}
    end={{x: 0, y: 1}}>
    <Text style={styles.text}>Inicia Sesión</Text>
    </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width:200,
    marginTop: 60
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  text: {
    fontSize: 14,
    color: '#34434D',
    fontWeight: 'bold'
  }
})

export default ButtonGradient