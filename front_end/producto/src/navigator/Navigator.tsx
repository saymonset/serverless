import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../context/AuthContext';

import { LoginScreen } from '../screens/LoginScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { SendSmsScreen } from '../screens/SendSmsScreen';
import { UserAdd } from '../screens/UserAdd';


const Stack = createStackNavigator();

export const Navigator = () => {

  const { status } = useContext( AuthContext );

  if ( status === 'checking' ) return <LoadingScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >

      {
        (status !== 'authenticated') 
          ? (
            <>
             
              <Stack.Screen name="SendSmsScreen" component={ SendSmsScreen } />
              <Stack.Screen name="UserAdd" component={ UserAdd } />
              <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            
            </>
          )
          : (
            <Stack.Screen name="ProtectedScreen" component={ ProtectedScreen } />
          )
      }

    </Stack.Navigator>
  );
}