import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { db } from '../database/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateUserScreen = (props) => {
  
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === '') {
      alert('Por favor ingrese un nombre');
    } else {
      try {
        await addDoc(collection(db, 'users'), {
          name: state.name,
          email: state.email,
          phone: state.phone,
        });
        props.navigation.navigate('UsersList');
      } catch (error) {
        console.error("Error al añadir documento: ", error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre de Usuario"
          value={state.name}
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email de Usuario"
          value={state.email}
          onChangeText={(value) => handleChangeText('email', value)}
          keyboardType='email-address'
          autoCapitalize='none'
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefono del Usuario"
          value={state.phone}
          onChangeText={(value) => handleChangeText('phone', value)}
          keyboardType='numeric'
          maxLength={10}
        />
      </View>
      <View>
        <Button color='#4AB94F' title="Guardar Usuario" onPress={saveNewUser} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFC292',
  },
});

export default CreateUserScreen;

