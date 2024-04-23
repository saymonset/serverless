import 'react-native-gesture-handler';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import React from 'react'
import { Text, useColorScheme, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigator/StackNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from './presentation/store';
 

export const VaccineApp = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor =
      colorScheme === 'dark'
        ? theme['color-basic-800']
        : theme['color-basic-100'];
  return (
    <>
   
           <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={theme}>
             <Provider store={store}>
                <NavigationContainer>{/* Rest of your app code */} 
                    <StackNavigator/>
                </NavigationContainer>
                </Provider>
            </ApplicationProvider>
   
           
    </>
    

  )
}
