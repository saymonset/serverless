import 'react-native-gesture-handler';
import React, { Children } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
    return (
        <NavigationContainer>
            <AppState>
              <Provider store={ store}>
                  <Navigator></Navigator>
              </Provider>
            </AppState>
        </NavigationContainer>
      )
 }

 export default VaccinesApp;
 