import 'react-native-gesture-handler';
import React, { Children } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import { Navigator } from './navigator/Navigator';
import { store } from './store';

const Stack = createStackNavigator();


const AppState = ({ children }: any ) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}
 
 const VaccinesApp = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor =
        colorScheme === 'dark'
        ? theme['color-basic-500']
        : theme['color-basic-100'];

    return (
        <>
           <IconRegistry icons={EvaIconsPack} />
           <ApplicationProvider
             {...eva} theme={theme}>
                <NavigationContainer
                   
                 
                >
                    <AppState>
                    <Provider store={ store}>
                           <Navigator></Navigator>
                    </Provider>
                    </AppState>
                </NavigationContainer>
           </ApplicationProvider>
        </>
       
       
      )
 }

 export default VaccinesApp;
 