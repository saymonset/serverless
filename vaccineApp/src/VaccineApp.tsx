import 'react-native-gesture-handler';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import React from 'react'
import { Text, useColorScheme, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from './presentation/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {AuthProvider} from './presentation/providers/AuthProvider';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

// i18next.init({
//   interpolation: { escapeValue: false}
// })
 
// Create a client
const queryClient = new QueryClient()

export const VaccineApp = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor =
      colorScheme === 'dark'
        ? theme['color-basic-800']
        : theme['color-basic-100'];
  return (
    <QueryClientProvider client={queryClient}>
   
           <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={theme}>
             <Provider store={store}>
                <NavigationContainer>{/* Rest of your app code */} 
                    <AuthProvider>
                      <I18nextProvider i18n={i18next}> 
                         <StackNavigator/>
                       </I18nextProvider>
                    </AuthProvider>
                </NavigationContainer>
                </Provider>
            </ApplicationProvider>
   
           
    </QueryClientProvider>
    

  )
}
