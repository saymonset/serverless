import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserPart2 } from '../screens/UserPart2';
import { LoginScreen } from '../screens/LoginScreen';

const Stack = createStackNavigator();

export const Navigator = ()=> {
  return (
    <Stack.Navigator>
         <Stack.Screen name="LoginScreen" component={ LoginScreen } /> 
        <Stack.Screen name="UserPart2" component={UserPart2} />
        {/**/}
      {/* 
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}