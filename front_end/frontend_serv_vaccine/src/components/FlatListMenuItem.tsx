import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../interfaces/appInterfaces'
 

interface Props {
    menuItem: MenuItem;
}

export const FlatListMenuItem = ({ menuItem }:Props) => {


    const navigation = useNavigation();


  return (
    <TouchableOpacity
       activeOpacity={0.8}
       onPress = { () => {
                  navigation.navigate( menuItem.component as never) 
           }
    }
      >
         <View style = { styles.container}>
            <Icon
                name = { menuItem.icon}
                color = "gray"
                size = { 23 }
            />
            <Text style = { styles.itemText}>{ menuItem.name }-{ menuItem.icon }</Text>

            <View style = {{ flex: 1 }} />
            <Icon
                name = "chevron-forward-outline"
                color = "gray"
                size = { 23 }
            />
        </View>
    </TouchableOpacity>
   
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    itemText: {
        marginLeft: 10,
        fontSize: 19,
        color: 'white',
    }
})