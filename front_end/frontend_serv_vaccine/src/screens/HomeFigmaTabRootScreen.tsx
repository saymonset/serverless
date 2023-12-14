import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeFigmaTab1Screen } from './HomeFigmaTab1Screen';
import { HomeFigmaTab2Screen } from './HomeFigmaTab2Screen';
import { HomeFigmaTab3Screen } from './HomeFigmaTab3Screen';
import { HomeFigmaTab4Screen } from './HomeFigmaTab4Screen';
import { styles } from '../theme/registrodatosFigmaTheme';
import { colores } from '../theme/comunFigmaTheme';
import {  Text } from 'react-native-elements';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export const  HomeFigmaTabRootScreen = () => {
  return Platform.OS ==='ios'
         ? <TabsIOs/>
         :<TabsAndroid/>
}



const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
  return (
    <BottomTabAndroid.Navigator
        sceneAnimationEnabled= { true }
        barStyle={{
          backgroundColor: colores.primary
          

        }}
          screenOptions= { ( { route}) => ({
          tabBarIcon: ( { color, focused} ) => {
            let iconName: string = '';
              console.log(route.name)
              switch (  route.name ){
                case 'HomeFigmaTab1Screen':
                  iconName='home-outline'
                  break;
               case 'HomeFigmaTab2Screen':
                  iconName='person-outline'
                  break;
               case 'HomeFigmaTab3Screen':
                  iconName='calendar-outline'
                  break;
               case 'HomeFigmaTab4Screen':
                  iconName='settings-outline'
                     break;

              }
              return <Icon name={iconName} 
                           size = { 20 } 
                           color={focused ? '#00BFFF' : color}
                           />
          }
    })}
    >
      <BottomTabAndroid.Screen name="HomeFigmaTab1Screen" options={{title:''}} component={HomeFigmaTab1Screen} />
      <BottomTabAndroid.Screen name="HomeFigmaTab2Screen" options={{title:''}} component={HomeFigmaTab2Screen} />
      <BottomTabAndroid.Screen name="HomeFigmaTab3Screen" options={{title:''}} component={HomeFigmaTab3Screen} />
      <BottomTabAndroid.Screen name="HomeFigmaTab4Screen" options={{title:''}} component={HomeFigmaTab4Screen} />
    </BottomTabAndroid.Navigator>
  );
}


const BottomTabIOS = createBottomTabNavigator();

export const TabsIOs = () => {
  return (
    <BottomTabIOS.Navigator
      initialRouteName="Feed"
      sceneContainerStyle= {{
        backgroundColor:'white'
      }}
      screenOptions= { ( { route}) => ({
            tabBarIcon: ( { color, size, focused} ) => {
              let iconName: string = '';
                console.log(route.name)
                switch (  route.name ){
                    case 'HomeFigmaTab1Screen':
                       iconName='home-outline'
                       break;
                    case 'HomeFigmaTab2Screen':
                       iconName='person-outline'
                       break;
                    case 'HomeFigmaTab3Screen':
                       iconName='calendar-outline'
                       break;
                    case 'HomeFigmaTab4Screen':
                       iconName='settings-outline'
                       break;

                }
                return <Icon name={iconName} size = { 20 } color = { color }/>
            }
      })}
      
     
    >
      <BottomTabIOS.Screen name="HomeFigmaTab1Screen" options={{title:''}} component={HomeFigmaTab1Screen} />
      <BottomTabIOS.Screen name="HomeFigmaTab2Screen" options={{title:''}} component={HomeFigmaTab2Screen} />
      <BottomTabIOS.Screen name="HomeFigmaTab3Screen" options={{title:''}} component={HomeFigmaTab3Screen} />
      <BottomTabIOS.Screen name="HomeFigmaTab4Screen" options={{title:''}} component={HomeFigmaTab4Screen} />
    </BottomTabIOS.Navigator>
  );
}