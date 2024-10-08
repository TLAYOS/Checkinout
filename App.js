import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import LogInScreen from './screens/LogInScreen';


const Stack = createNativeStackNavigator();

function MyStack() {
  return(
    
    <Stack.Navigator>
      <Stack.Screen name='UsersList' component={UsersList} options={{title: 'Lista de Usuarios'}} />
      <Stack.Screen name='CreateUserScreen' component={CreateUserScreen} options={{title: 'Crear Usuario'}} />
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen} options={{title: 'Detalles del Usuario'}}/>
      <Stack.Screen name='LogInScreen' component={LogInScreen} options={{title: 'Inicio de Sesion'}}/>
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
