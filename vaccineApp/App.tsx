import 'react-native-gesture-handler';
import React from 'react'
import { Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';

 const App = () => {
  return (
    <NavigationContainer>{/* Rest of your app code */} 
      <Navigator/>
    </NavigationContainer>
  )
}

export default App;