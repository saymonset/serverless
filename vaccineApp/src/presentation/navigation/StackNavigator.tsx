import  React from 'react';
 
import { WelcomeScreen } from '../screens/home/WelcomeFigmaScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { useDispatch } from 'react-redux';
import { SendPhoneFigmaScreen } from '../screens/home/SendPhoneFigmaScreen';
import { SendCodeFigmaScreen } from '../screens/home/SendCodeFigmaScreen';
import { SendRegisterFigmaScreen } from '../screens/auth/SendRegisterFigmaScreen';
import { SeguridadFigmaScreen } from '../screens/home/SeguridadFigmaScreen';
import { PasswordRecoveryScreen } from '../screens/auth/PasswordRecoveryScreen';
import { SendCodeRecoveryFigmaScreen } from '../screens/home/SendCodeRecoveryFigmaScreen';
import { PasswordRecoveryTwiceScreen } from '../screens/auth/PasswordRecoveryTwiceScreen';
import { MainScreen } from '../screens/home/MainScreen';
import { DependentScreen } from '../screens/dependent/DependentScreen';
import { ApplyVaccinesAddScreen } from '../screens/vaccines/apply-vaccines/ApplyVaccinesAddScreen';
import { ApplyVaccinesDependentsScreen } from '../screens/vaccines/apply-vaccines/ApplyVaccinesDependentsScreen';
 

 

export type RootStackParams = {
  // LoadingScreen: undefined;
   LoginScreen: undefined;
  HomeScreen: undefined;
  WelcomeScreen: undefined;
  SendPhoneFigmaScreen: undefined;
  SendCodeFigmaScreen: undefined;
  SendRegisterFigmaScreen: undefined;
  SeguridadFigmaScreen: undefined;
  PasswordRecoveryScreen: undefined;
  SendCodeRecoveryFigmaScreen: undefined;
  PasswordRecoveryTwiceScreen: undefined;
  MainScreen: undefined;
  DependentScreen: {dependentId: string};
  ApplyVaccinesDependentsScreen:  undefined;
  ApplyVaccinesAddScreen: {dependentId: string};
   
}

const Stack = createStackNavigator<RootStackParams>();

export const  StackNavigator = () => {
 
  return (
    <Stack.Navigator 
       initialRouteName="WelcomeScreen"
       screenOptions={{
        headerShown: false,
        cardStyle: {
            backgroundColor: 'white'
        }
       }}
    >
    
                  <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } /> 
                  {/* HomeScreen es para usuarios nuevos que quieran integrarse */}
                  <Stack.Screen name="HomeScreen" component={   HomeScreen } />
                  <Stack.Screen name="LoginScreen" component={   LoginScreen } />
                  <Stack.Screen name="SendPhoneFigmaScreen" component={   SendPhoneFigmaScreen } />
                  <Stack.Screen name="SendCodeFigmaScreen" component={   SendCodeFigmaScreen } />
                  <Stack.Screen name="SendRegisterFigmaScreen" component={   SendRegisterFigmaScreen } />
                  <Stack.Screen name="SeguridadFigmaScreen" component={   SeguridadFigmaScreen } />
                  <Stack.Screen name="PasswordRecoveryScreen" component={   PasswordRecoveryScreen } />
                  <Stack.Screen name="SendCodeRecoveryFigmaScreen" component={   SendCodeRecoveryFigmaScreen } />
                  <Stack.Screen name="PasswordRecoveryTwiceScreen" component={   PasswordRecoveryTwiceScreen } />
                  <Stack.Screen name="MainScreen" component={   MainScreen } />
                  <Stack.Screen name="DependentScreen" component={   DependentScreen } />
                  <Stack.Screen name="ApplyVaccinesDependentsScreen" component={   ApplyVaccinesDependentsScreen } />
                  <Stack.Screen name="ApplyVaccinesAddScreen" component={   ApplyVaccinesAddScreen } />
  
  
     
      
   
 
    </Stack.Navigator>
  );
}