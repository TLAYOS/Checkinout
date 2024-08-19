import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { db } from '../database/firebase';
import { collection, addDoc, getFirestore, serverTimestamp } from 'firebase/firestore';

const PostsScreen = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'images/');
      const result = await listAll(listRef);
      const imageUrls = await Promise.all(result.items.map(item => getDownloadURL(item)));
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  const handlePost = async () => {
    if (!selectedImage || !message) {
      alert('Por favor selecciona una imagen y escribe un message.');
      return;
    }
  
    try {
      const postsRef = collection(db, 'posts');
  
      await addDoc(postsRef, {
        imageUrl: selectedImage,
        message: message,
        timestamp: serverTimestamp(),  
      });
  
      alert('Aviso creado con exito');
      
      // Clear the selection and message after posting
      setSelectedImage(null);
      setMessage('');
      
    } catch (error) {
      console.error('Error añadiendo el aviso: ', error);
      alert('Por favor intentelo de nuevo.');
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
      <TextInput
        placeholder="Escribe el anuncio..."
        value={message}
        onChangeText={setMessage}
        style={styles.textInput}
      />
      <Button title="Publicar" onPress={handlePost} />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 8,
    },
    textInput: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      marginVertical: 16,
      paddingHorizontal: 8,
    },
  });

export default PostsScreen