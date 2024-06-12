

import {  StyleProp, View, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
  }
  
  export interface ThemeColors {
    primary: string;
    text: string;
    background: string;
    cardBackground: string;
    buttonTextColor: string;
  }
  export const colors: ThemeColors = {
    primary: "#5856D6",
    text: "black",
  
    background: "#F3F2F7",
    cardBackground: "white",
    buttonTextColor: "white",
  };
  
  export const Separator = ({ style }:Props) => {
    return (
      <View style={{
        backgroundColor: colors.cardBackground
      }}>
          <View 
            style={[
              {
                alignSelf: 'center',
                width: '80%',
                height: 1,
                backgroundColor: colors.text,
                opacity: 0.1,
                marginVertical: 8,
              },
              style
            ]}
          
          />
      </View>
    )
  }