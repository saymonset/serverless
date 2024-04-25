import  React from 'react';
 
import { WelcomeScreen } from '../screens/home/WelcomeFigmaScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { useDispatch } from 'react-redux';
import { SendPhoneFigmaScreen } from '../screens/home/SendPhoneFigmaScreen';
import { SendCodeFigmaScreen } from '../screens/home/SendCodeFigmaScreen';
import { SendRegisterFigmaScreen } from '../screens/home/SendRegisterFigmaScreen';
import { SeguridadFigmaScreen } from '../screens/home/SeguridadFigmaScreen';

 

export type RootStackParams = {
  // LoadingScreen: undefined;
   LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  WelcomeScreen: undefined;
  SendPhoneFigmaScreen: undefined;
  SendCodeFigmaScreen: undefined;
  SendRegisterFigmaScreen: undefined;
  SeguridadFigmaScreen: undefined;
   
}

const Stack = createStackNavigator<RootStackParams>();

export const  StackNavigator = () => {
 
  return (
    <Stack.Navigator 
       initialRouteName="SendRegisterFigmaScreen"
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
                  <Stack.Screen name="SendPhoneFigmaScreen" component={   SendPhoneFigmaScreen } />
                  <Stack.Screen name="SendCodeFigmaScreen" component={   SendCodeFigmaScreen } />
                  <Stack.Screen name="SendRegisterFigmaScreen" component={   SendRegisterFigmaScreen } />
                  <Stack.Screen name="SeguridadFigmaScreen" component={   SeguridadFigmaScreen } />
  
     
      
   
 
    </Stack.Navigator>
  );
}