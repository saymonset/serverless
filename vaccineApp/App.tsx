import React from 'react'
import { Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

 const App = () => {
  return (
    <NavigationContainer>{/* Rest of your app code */} 
      <View><Text>App</Text></View>
    </NavigationContainer>
  )
}

export default App;