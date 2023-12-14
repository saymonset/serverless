import React from 'react';
import { Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface Props {
  title: string;
  marginTop?: number;
  marginBottom?: number,
  stylesFigma?: StyleProp<ViewStyle> 
              & { title?: StyleProp<TextStyle> }
              & { titlesecund?: StyleProp<TextStyle> };
  type?: 'small' | 'big',
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right',
  isAlertaAsterisco?:boolean,
  color?: string;
}

export const HeaderTitleFigma = ({ title, marginTop=0,marginBottom=20, stylesFigma, 
                                   type='big', textAlign='left', isAlertaAsterisco = false,
                                   color='black'}: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[{ marginTop, marginBottom, marginHorizontal:20}]}>
       <Text style={[(type === 'big') ? stylesFigma?.title : stylesFigma?.titlesecund,  
                                        {textAlign},
                                        { color } ]}>{title}
          { isAlertaAsterisco && (<Text style={{ color: 'skyblue' }}> *</Text>)} 
       </Text>
    </View>
  );
};
