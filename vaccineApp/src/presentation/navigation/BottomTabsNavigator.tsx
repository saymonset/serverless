import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { HomeFigmaTab1Screen } from '../screens/tabs/HomeFigmaTab1Screen';
import { Tab2Screen } from '../screens/tabs/Tab2Screen';
import { Tab3Screen } from '../screens/tabs/Tab3Screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { DependentsMainScreen } from '../screens/dependent/DependentsMainScreen';
import { ConfigFigmaTab4Screen } from '../screens/tabs/ConfigFigmaTab4Screen';


export const BottomTabsNavigator = () => {
    return Platform.OS ==='ios'
    ? <TabsIOs/>
    :<TabsAndroid/>
}



export const BottomTabAndroid = createBottomTabNavigator();

const TabsAndroid = () => {
    return (
      <BottomTabAndroid.Navigator
        
            screenOptions= { ( { route}) => ({
            tabBarIcon: ( { color, focused} ) => {
              let iconName: string = '';
                switch (  route.name ){
                  case 'HomeFigmaTab1Screen':
                    iconName='home-outline'
                    break;
                 case 'DependentsMainScreen':
                    iconName='person-outline'
                    break;
                 case 'HomeFigmaTab3Screen':
                    iconName='calendar-outline'
                    break;
                 case 'ConfigFigmaTab4Screen':
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
        {/* En HomeFigmaTab1Screen aparece la tarjeta de (Consultas, Vacunacion, Embarazo, Patologias ) . PROXIMAS CITAS, CUIDA TU SALUD */}
        <BottomTabAndroid.Screen name="HomeFigmaTab1Screen" options={{title:''}} component={HomeFigmaTab1Screen} />
        <BottomTabAndroid.Screen name="DependentsMainScreen" options={{title:''}} component={DependentsMainScreen} />
        <BottomTabAndroid.Screen name="HomeFigmaTab3Screen" options={{title:''}} component={Tab3Screen} />
        <BottomTabAndroid.Screen name="ConfigFigmaTab4Screen" options={{title:''}} component={ConfigFigmaTab4Screen} />
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
                    case 'DependentsMainScreen':
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
      <BottomTabIOS.Screen name="DependentsMainScreen" options={{title:''}} component={DependentsMainScreen} />
      <BottomTabIOS.Screen name="HomeFigmaTab3Screen" options={{title:''}} component={Tab3Screen} />
      <BottomTabIOS.Screen name="ConfigFigmaTab4Screen" options={{title:''}} component={ConfigFigmaTab4Screen} />

 
      
    </BottomTabIOS.Navigator>
  );
}