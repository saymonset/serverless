import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeFigmaTab1Screen } from './HomeFigmaTab1Screen';
import { PerfilesFigmaScreen } from './PerfilesFigmaScreen';
import { HomeFigmaTab3Screen } from './HomeFigmaTab3Screen';
import { HomeFigmaTab4Screen } from './HomeFigmaTab4Screen';
import { colores } from '../theme/comunFigmaTheme';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useEffect from 'react';


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
              switch (  route.name ){
                case 'HomeFigmaTab1Screen':
                  iconName='home-outline'
                  break;
               case 'PerfilesFigmaScreen':
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
      <BottomTabAndroid.Screen name="PerfilesFigmaScreen" options={{title:''}} component={PerfilesFigmaScreen} />
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
            tabBarIcon: ( { color} ) => {
              let iconName: string = '';
                switch (  route.name ){
                    case 'HomeFigmaTab1Screen':
                       iconName='home-outline'
                       break;
                    case 'PerfilesFigmaScreen':
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
      <BottomTabIOS.Screen name="PerfilesFigmaScreen" options={{title:''}} component={PerfilesFigmaScreen} />
      <BottomTabIOS.Screen name="HomeFigmaTab3Screen" options={{title:''}} component={HomeFigmaTab3Screen} />
      <BottomTabIOS.Screen name="HomeFigmaTab4Screen" options={{title:''}} component={HomeFigmaTab4Screen} />
    </BottomTabIOS.Navigator>
  );
}