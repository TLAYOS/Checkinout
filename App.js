import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import LogInScreen from './screens/LogInScreen';
import HomeScreen from './screens/HomeScreen';
import UploadPostScreen from './screens/UploadPostScreen';
import PostsScreen from './screens/PostsScreen';
import PostsListScreen from './screens/PostsListScreen';
import CheckInScreen from './screens/CheckInScreen';
import CheckOutScreen from './screens/CheckOutScreen';


const Stack = createNativeStackNavigator();

function MyStack() {
  return(
    
    <Stack.Navigator>
      <Stack.Screen name='LogInScreen' component={LogInScreen} options={{title: 'Inicio de Sesion'}}/>
      <Stack.Screen name='UsersList' component={UsersList} options={{title: 'Lista de Usuarios'}} />
      <Stack.Screen name='CreateUserScreen' component={CreateUserScreen} options={{title: 'Crear Usuario'}} />
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen} options={{title: 'Detalles del Usuario'}}/>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{title: 'Menu'}}/> 
      <Stack.Screen name='UploadPostScreen' component={UploadPostScreen} options={{title: 'Guardar Imagen'}}/>
      <Stack.Screen name='PostsScreen' component={PostsScreen} options={{title: 'Crear Avisos'}}/>
      <Stack.Screen name='PostsListScreen' component={PostsListScreen} options={{title: 'Avisos'}}/>
      <Stack.Screen name='CheckInScreen' component={CheckInScreen} options={{title: 'Registro de entrada'}}/>
      <Stack.Screen name='ChecOutScreen' component={CheckOutScreen} options={{title: 'Registro de salida'}}/>

    </Stack.Navigator>

    
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
