import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../database/firebase';

const UserDetailScreen = (props) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setloading] = useState(true);

  const getUserById = async (id) => {
    try {
      if (!id) {
        console.error("El ID del usuario no esta definido o es nulo");
        return;
      }

      const dbRef = doc(db, 'users', id);
      const docSnap = await getDoc(dbRef);

      if (docSnap.exists()) {
        const user = docSnap.data();
        setUser({
          ...user,
          id: docSnap.id,
        });
        setloading(false)
      } else {
        console.error("No existe tal documento!");
      }
    } catch (error) {
      console.error("Error al obtener el Usuario:", error);
    }
  };

  useEffect(() => {
    const userId = props.route?.params?.userId;
    console.log("ID del Usuario:", userId); // Debugging line
    getUserById(userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    try {
      const dbRef = doc(db, 'users', props.route.params.userId);
      await deleteDoc(dbRef);
      props.navigation.navigate('UsersList');
      
    } catch (error) {
      console.error("Error al Borrar Usuario: ", error);
    }

  }

  const updateUser = async () => {
    try {
      const dbRef = doc(db, 'users', props.route.params.userId);
      const updatedData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
      await updateDoc(dbRef, updatedData);
      props.navigation.navigate('UsersList');
    } catch (error) {
      console.error("Error al Editar usuario: ", error);
    }
  }

  const deleteConfirmation = () => {
    Alert.alert("Esto borrará el usuario de la base de datos", "¿Continuar?", [
      {text: 'Si', onPress:() => deleteUser()},
      {text: 'No', onPress:() => console.log(false)}
    ])
  }

  if (loading) {
    return(
      <View>
        <ActivityIndicator size="large" color="#2EDB0D"/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre de Usuario"
          value={user.name}
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email de Usuario"
          value={user.email}
          onChangeText={(value) => handleChangeText('email', value)}
          keyboardType='email-address'
          autoCapitalize='none'
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefono del Usuario"
          value={user.phone}
          onChangeText={(value) => handleChangeText('phone', value)}
          keyboardType='numeric'
          maxLength={10}
        />
      </View>
      <View>
        <Button color="#E2CC87" title="Editar Usuario" onPress={() => updateUser()} />
      </View>
      <View>
        <Button color="#D80000" title="Borrar Usuario" onPress={() => deleteConfirmation()} />
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

export default UserDetailScreen;

