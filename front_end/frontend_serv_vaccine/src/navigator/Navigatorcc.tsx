import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
 


const Stack = createStackNavigator();

export const Navigatorxxx = () => {

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
            
              <Stack.Screen name="UserPartTotal" component={ UserPartTotal } />
              <Stack.Screen name="SendSmsScreen" component={ SendSmsScreen } />
            
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