import 'react-native-gesture-handler';
import React, { Children } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigator } from './src/navigator/navigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();


const AppState = ({ children }: any ) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}
 const App = () => {
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

export default App;

