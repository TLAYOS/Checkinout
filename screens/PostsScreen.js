import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, Button, StyleSheet } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { db } from '../database/firebase';
import { collection, addDoc } from 'firebase/firestore';

const PostsScreen = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'path/to/images');
      const result = await listAll(listRef);
      const imageUrls = await Promise.all(result.items.map(item => getDownloadURL(item)));
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  const handlePost = async () => {
    if (!selectedImage || !message) {
      alert('Please select an image and write a message.');
      return;
    }
  
    try {
      // Create a reference to the 'posts' collection
      const postsRef = collection(db, 'posts');
  
      // Add a new document with the selected image URL and message
      await addDoc(postsRef, {
        imageUrl: selectedImage,
        message: message,
        timestamp: new Date(),
        // You can add more fields here, like the user's ID, username, etc.
      });
  
      alert('Post saved successfully!');
      
      // Clear the selection and message after posting
      setSelectedImage(null);
      setMessage('');
      
      // You can also navigate to another screen if needed
      // props.navigation.navigate('SomeOtherScreen');
    } catch (error) {
      console.error('Error adding post: ', error);
      alert('Failed to save post. Please try again.');
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
      <Button title="Post" onPress={handlePost} />
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