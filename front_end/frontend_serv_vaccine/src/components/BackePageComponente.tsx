import React from 'react';
import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {
  page: string;
  route?: any;
  navigation?: StackNavigationProp<any, any>;
  title1?: string;
  title2?: string;
}



export const BackePageComponente = ({ navigation, page, title1="", title2="" }: Props) => {

  const navigationAux = useNavigation();

  const onBack = async () => {
    Keyboard.dismiss();
    navigation ?  navigation.replace(page) : navigationAux.navigate(page);
   
  };

  return (
    
    <View
      style={{
           ...styles.container,
           ...(title1 || title2 ? styles.allScreen : {}),
      }}
    >
      <TouchableOpacity onPress={() => onBack()} style={{ marginTop: 0 }}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
      </TouchableOpacity>
      <Text style={{marginTop:10}}> { title1 }</Text>
      <Text style={{marginTop:10}}> { title2 }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container :{
     //  backgroundColor:'red',
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: 0,
     marginLeft: 15,
     marginHorizontal: 1,
     marginTop: Platform.OS === 'ios' ? 30 : 30,
},
  allScreen :{
      flex:1,
  }
});
