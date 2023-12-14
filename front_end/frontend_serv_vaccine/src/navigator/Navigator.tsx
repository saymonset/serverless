import  React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { HomeScreen } from '../screens/HomeScreen';
import { TextInputScreen } from '../screens/TextInputScreen';
import { PullToRefreshScreen } from '../screens/PullToRefreshScreen';
import { CustomSectionListScreen } from '../screens/CustomSectionListScreen';
import { ModalScreen } from '../screens/ModalScreen';
import { InfiniteScrollScreen } from '../screens/InfiniteScrollScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

import {  store } from '../store'
import { SendSmsScreen } from '../screens/SendSmsScreen';
import { DependentScreen } from '../screens/DependentScreen';
import { WelcomeScreen } from '../screens/WelcomeFigmaScreen';
import { SendPhoneFigmaScreen } from '../screens/SendPhoneFigmaScreen';
import { SendCodeFigmaScreen } from '../screens/SendCodeFigmaScreen';
import { SeguridadFigmaScreen } from '../screens/SeguridadFigmaScreen';
import { RegistrodatosFigmaScreen } from '../screens/RegistrodatosFigmaScreen';
import { LoginFigmaScreen } from '../screens/LoginFigmaScreen';
import { PasswordRecoveryScreen1 } from '../screens/PasswordRecoveryScreen1';
import { SendCodeFigmaRecoveryScreen2 } from '../screens/SendCodeFigmaRecoveryScreen2';
import { ConfirmPasswordRecoveryFigmaScreen3 } from '../screens/ConfirmPasswordRecoveryFigmaScreen3';
import { ContactRecoveryFigmaScreen } from '../screens/ContactRecoveryFigmaScreen';
import { HomeFigmaTabRootScreen } from '../screens/HomeFigmaTabRootScreen';



const Stack = createStackNavigator();

export const Navigator = () => {

  const { status  } = useSelector( (state: store ) => state.loginStore)

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
          ? (<>
                 
                 
                  
                  <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } /> 
                  <Stack.Screen name="LoginFigmaScreen" component={ LoginFigmaScreen } />
                  <Stack.Screen name="PasswordRecoveryScreen1" component={ PasswordRecoveryScreen1 } />
                  <Stack.Screen name="ContactRecoveryFigmaScreen" component={ ContactRecoveryFigmaScreen } />
                  <Stack.Screen name="SendCodeFigmaRecoveryScreen2" component={ SendCodeFigmaRecoveryScreen2 } />
                  <Stack.Screen name="ConfirmPasswordRecoveryFigmaScreen3" component={ ConfirmPasswordRecoveryFigmaScreen3 } />
                  <Stack.Screen name="SendPhoneFigmaScreen" component={ SendPhoneFigmaScreen } />
                  <Stack.Screen name="SendCodeFigmaScreen" component={ SendCodeFigmaScreen } />
                  <Stack.Screen name="SeguridadFigmaScreen" component={ SeguridadFigmaScreen } />
                  <Stack.Screen name="RegistrodatosFigmaScreen" component={ RegistrodatosFigmaScreen } /> 
                  
                 
                  <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                  <Stack.Screen name="SendSmsScreen" component={ SendSmsScreen } />
                  <Stack.Screen name="RegisterScreen" component={ RegisterScreen } /> 
                 
            </>)
          : (<>
               {/** Este HomeScreen es el principa que lama el menu*/}
                <Stack.Screen name="HomeFigmaTabRootScreen" component={ HomeFigmaTabRootScreen } /> 
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="DependentScreen" component={ DependentScreen } />
                <Stack.Screen name="TextInputScreen" component={TextInputScreen} />
                <Stack.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
                <Stack.Screen name="CustomSectionListScreen" component={CustomSectionListScreen} />
                <Stack.Screen name="ModalScreen" component={ModalScreen} />
                <Stack.Screen name="InfiniteScrollScreen" component={ InfiniteScrollScreen } />
             </>)
      
      }
     
      
   
 
    </Stack.Navigator>
  );
}