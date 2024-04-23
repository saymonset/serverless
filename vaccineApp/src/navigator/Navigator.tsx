import  React from 'react';
 
import { WelcomeScreen } from '../screens/WelcomeFigmaScreen';
import { createStackNavigator } from '@react-navigation/stack';

 

export type RootStackParams = {
  WelcomeScreen: undefined;
   
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
 
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
      
          (<>
                  <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } /> 
                
            </>)
          
      
      }
     
      
   
 
    </Stack.Navigator>
  );
}