import  React from 'react';
 
import { WelcomeScreen } from '../presentation/screens/home/WelcomeFigmaScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../presentation/screens/home/HomeScreen';
import { LoginScreen } from '../presentation/screens/auth/LoginScreen';
import RegisterScreen from '../presentation/screens/auth/RegisterScreen';

 

export type RootStackParams = {
  // LoadingScreen: undefined;
   LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  WelcomeScreen: undefined;
   
}

const Stack = createStackNavigator<RootStackParams>();

export const  StackNavigator = () => {
 
  return (
    <Stack.Navigator 
       initialRouteName="LoginScreen"
       screenOptions={{
        headerShown: false,
        cardStyle: {
            backgroundColor: 'white'
        }
       }}
    >
    
                  <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } /> 
                  <Stack.Screen name="HomeScreen" component={   HomeScreen } />
                  <Stack.Screen name="LoginScreen" component={   LoginScreen } />
                  <Stack.Screen name="RegisterScreen" component={   RegisterScreen } />
  
     
      
   
 
    </Stack.Navigator>
  );
}