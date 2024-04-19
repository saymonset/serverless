import  React from 'react';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { TextInputScreen } from '../screens/TextInputScreen';
import { PullToRefreshScreen } from '../screens/PullToRefreshScreen';
import { CustomSectionListScreen } from '../screens/CustomSectionListScreen';
import { ModalScreen } from '../screens/ModalScreen';

import { DependentScreen } from '../screens/DependentScreen';
import { WelcomeScreen } from '../presentation/screens/home/WelcomeFigmaScreen';
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
import { SearchScreen } from '../screens/SearchScreen';
import { PerfilFigmaAddScreen } from '../screens/PerfilFigmaAddScreen';
import { PerfilesFigmaScreen } from '../screens/PerfilesFigmaScreen';
import { Dependent } from '../interfaces/dependent-interfaces';
import { ApplyVaccinesDependentsScreen } from '../screens/ApplyVaccinesDependentsScreen';
import { ApplyVaccinesAddScreen } from '../screens/ApplyVaccinesAddScreen';
import { ApplyVaccineConsultaScreen } from '../screens/ApplyVaccineConsultaScreen';
import { ApplyVaccinesDetailScreen } from '../screens/ApplyVaccinesDetailScreen';
import { ConsultVaccinesDependentsScreen } from '../screens/ConsultVaccinesDependentsScreen';
import { store } from '../store' 
import { HomeScreen } from '../presentation/screens/home/HomeScreen';
import { LoginScreen } from '../presentation/screens/auth/LoginScreen';
import { RegisterScreen } from '../presentation/screens/auth/RegisterScreen';
import { LoadingScreen } from '../presentation/screens/loading/LoadingScreen';

export type RootStackParams = {

  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LoadingScreen: undefined;

  WelcomeScreen: undefined;
  LoginFigmaScreen: undefined;
  PasswordRecoveryScreen1: undefined;
  ContactRecoveryFigmaScreen: undefined;
  SendCodeFigmaRecoveryScreen2: undefined;
  ConfirmPasswordRecoveryFigmaScreen3: undefined;
  SendPhoneFigmaScreen: undefined;
  SendCodeFigmaScreen: undefined;
  SeguridadFigmaScreen: undefined;
  RegistrodatosFigmaScreen: undefined;

  // Parte privada autenticado
  HomeFigmaTabRootScreen: undefined;
  PerfilFigmaAddScreen: {dependent:Dependent};
  PerfilesFigmaScreen: undefined;

  ApplyVaccinesDependentsScreen: undefined;
  ConsultVaccinesDependentsScreen: undefined;
  ApplyVaccinesAddScreen: undefined;
  ApplyVaccineConsultaScreen: undefined;
  ApplyVaccinesDetailScreen: undefined;

  DependentScreen: undefined;
  TextInputScreen: undefined;
  PullToRefreshScreen: undefined;
  CustomSectionListScreen: undefined;
  ModalScreen: undefined;
  SearchScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const Navigator = () => {
  //const { status  } = useSelector( (state: store ) => state.useAuthStore)
 const { status  } = useSelector( (state: store ) => state.loginStore)

  return (
    <Stack.Navigator 
       initialRouteName='WelcomeScreen'
       screenOptions={{
        headerShown: false,
        //cardStyleInterpolator: fadeAnimation,
        cardStyle: {
            backgroundColor: 'white'
        }
       }}
    >
      {  
      
          (status !== 'authenticated')
          ? (<>

                  <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}} name="HomeScreen" component={ HomeScreen } /> 
                  <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}} name="LoginScreen" component={ LoginScreen } /> 
                  <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}} name="RegisterScreen" component={ RegisterScreen } /> 
                  <Stack.Screen
                          options={{cardStyleInterpolator: fadeAnimation}}
                          name="LoadingScreen"
                          component={LoadingScreen}
                        />


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
            </>)
          : (<>
               {/** Este HomeScreen es el principal que llama el menu de abajo y cards*/}
               <Stack.Screen name="HomeFigmaTabRootScreen" component={ HomeFigmaTabRootScreen } />  
               <Stack.Screen name="PerfilFigmaAddScreen" component={ PerfilFigmaAddScreen } />  
               <Stack.Screen name="PerfilesFigmaScreen" component={ PerfilesFigmaScreen } />  

               <Stack.Screen name="ApplyVaccinesDependentsScreen" component={ ApplyVaccinesDependentsScreen } />  
               <Stack.Screen name="ConsultVaccinesDependentsScreen" component={ ConsultVaccinesDependentsScreen } />  
               <Stack.Screen name="ApplyVaccinesAddScreen" component={ ApplyVaccinesAddScreen } />  
               <Stack.Screen name="ApplyVaccineConsultaScreen" component={ ApplyVaccineConsultaScreen } />  
               <Stack.Screen name="ApplyVaccinesDetailScreen" component={ ApplyVaccinesDetailScreen } />  
             
                <Stack.Screen name="DependentScreen" component={ DependentScreen } />
                <Stack.Screen name="TextInputScreen" component={TextInputScreen} />
                <Stack.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
                <Stack.Screen name="CustomSectionListScreen" component={CustomSectionListScreen} />
                <Stack.Screen name="ModalScreen" component={ModalScreen} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                 
                
    
             </>)
      
      }
     
      
   
 
    </Stack.Navigator>
  );
}