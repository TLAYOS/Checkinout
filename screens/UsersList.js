import React, { useEffect, useId, useState } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import firebase from '../database/firebase'
import { db } from '../database/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { ListItem, Avatar } from 'react-native-elements'
import UserDetailScreen from './UserDetailScreen'

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db,'users'),(querySnapshot) => {

      const usersArray = [];

      querySnapshot.forEach((doc) => {
        const {name, email, phone} = doc.data()
        usersArray.push({
          id: doc.id,
          name,
          email,
          phone
        });
      });
      console.log(usersArray);
      setUsers(usersArray);
    });

    return() => unsubscribe();
  }, [])
  return (
    <ScrollView>
      <Button title='Crear Usuario' onPress={() => props.navigation.navigate('CreateUserScreen')}/>
      {
        users.map((user) => {
          return(
            <ListItem
            key={user.id} bottomDivider onPress={() =>{
              props.navigation.navigate('UserDetailScreen', {
                userId: user.id
              })
            } }>
              <ListItem.Chevron/>
              <Avatar source={{uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg'}} rounded />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </ScrollView>
    
  )
}

export default UsersList