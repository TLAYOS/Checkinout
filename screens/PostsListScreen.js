import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { db } from '../database/firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';

const PostsListScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const postsRef = collection(db, 'posts');
        
        const querySnapshot = await getDocs(postsRef);

        
        const postsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        
        setPosts(postsList);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }) => {
    // Handle timestamp
    let formattedTimestamp = '';
    if (item.timestamp instanceof Timestamp) {
      formattedTimestamp = item.timestamp.toDate().toLocaleString();
    } else if (item.timestamp && typeof item.timestamp === 'object') {
      formattedTimestamp = new Date(item.timestamp.seconds * 1000).toLocaleString();
    }

    return (
      <View style={styles.postContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{formattedTimestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PostsListScreen;

