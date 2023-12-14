import React from 'react';
import { Keyboard, Platform, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {
  page: string;
  route?: any;
}

export const BackePageComponente = ({ navigation, page }: Props) => {
  const onBack = async () => {
    Keyboard.dismiss();
    navigation.replace(page);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 0,
        marginLeft: 15,
        marginHorizontal: 1,
        marginTop: Platform.OS === 'ios' ? 30 : 30,
      }}
    >
      <TouchableOpacity onPress={() => onBack()} style={{ marginTop: 0 }}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};
