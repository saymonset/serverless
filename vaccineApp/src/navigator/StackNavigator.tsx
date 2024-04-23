import  React from 'react';
 
import { WelcomeScreen } from '../presentation/screens/home/WelcomeFigmaScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../presentation/screens/home/HomeScreen';

 

export type RootStackParams = {
  // LoadingScreen: undefined;
  // LoginScreen: undefined;
  // RegisterScreen: undefined;
  HomeScreen: undefined;
  WelcomeScreen: undefined;
   
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
 
  return (
    <Stack.Navigator 
       initialRouteName="HomeScreen"
       screenOptions={{
        headerShown: false,
        cardStyle: {
            backgroundColor: 'white'
        }
       }}
    >
    
                  <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } /> 
                  <Stack.Screen name="HomeScreen" component={   HomeScreen } />
  
     
      
   
 
    </Stack.Navigator>
  );
}