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
 
import { ConsultVaccinesDependentsScreen } from '../screens/vaccines/consult-vaccines/ConsultVaccinesDependentsScreen';
import { ConsultVaccinesScreen } from '../screens/vaccines/consult-vaccines/ConsultVaccinesScreen';
import { VaccineFigmaScreen } from '../screens/vaccines/create-vaccines/vaccineFigmaScreen';
import { VaccineEditCreateScreen } from '../screens/vaccines/create-vaccines/VaccineEditCreateScreen';
import { DosisFigmaScreen } from '../screens/vaccines/dosis-vaccines/DosisFigmaScreen';
import { DosisEditCreateScreen } from '../screens/vaccines/dosis-vaccines/DosisEditCreateScreen';
import { ConsultDosisDetailScreen } from '../screens/vaccines/consult-vaccines/ConsultDosisDetailScreen';
import { ConfigDosisModalScreen } from '../screens/vaccines/dosis-vaccines/ConfigDosisModalScreen';
 
 

 

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
  ConsultVaccinesDependentsScreen:  undefined;
  VaccineFigmaScreen:  undefined;
  ConsultVaccinesScreen: {dependentId: string};
  VaccineEditCreateScreen: {vaccineId: string};
  DosisFigmaScreen:  {vaccineId: string};
  DosisEditCreateScreen: {dosisId: string};
  ConsultDosisDetailScreen: {vaccineId: string};
  ConfigDosisModalScreen: undefined;
  
  
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
                  <Stack.Screen name="MainScreen" component={   MainScreen } />
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
                  <Stack.Screen name="DependentScreen" component={   DependentScreen } />
                  <Stack.Screen name="ApplyVaccinesDependentsScreen" component={   ApplyVaccinesDependentsScreen } />
                  <Stack.Screen name="ApplyVaccinesAddScreen" component={   ApplyVaccinesAddScreen } />
                  <Stack.Screen name="ConsultVaccinesDependentsScreen" component={   ConsultVaccinesDependentsScreen } />
                  <Stack.Screen name="ConsultVaccinesScreen" component={   ConsultVaccinesScreen } />
                  <Stack.Screen name="VaccineFigmaScreen" component={   VaccineFigmaScreen } />
                  <Stack.Screen name="VaccineEditCreateScreen" component={   VaccineEditCreateScreen } />
                  <Stack.Screen name="DosisFigmaScreen" component={   DosisFigmaScreen } />
                  <Stack.Screen name="DosisEditCreateScreen" component={   DosisEditCreateScreen } />
                  <Stack.Screen name="ConsultDosisDetailScreen" component={   ConsultDosisDetailScreen } />
                   <Stack.Screen name="ConfigDosisModalScreen" component={   ConfigDosisModalScreen } /> 
    </Stack.Navigator>
  );
}