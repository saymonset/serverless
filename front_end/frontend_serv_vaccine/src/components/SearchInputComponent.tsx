import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Platform, StyleProp, ViewStyle, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { BackePageComponente } from './BackePageComponente';

interface Props {
        style?: StyleProp<ViewStyle>;
        onDebounce: (value: string) => void;
}
//interface Props extends StackScreenProps<any, any> {}
export const SearchInputComponent = (  {  onDebounce, style }:Props) => {

    const [textValue, setTextValue] = useState('');

    const debouncedValue = useDebouncedValue( textValue, 1500 );

    useEffect(() => {
        onDebounce(  debouncedValue  );
    }, [debouncedValue])
    

  return (
    <View style={{
        ...styles.container,
        ...style as any
        }}>
        <View style = {styles.goBack} >
            {/**  Boton regreso */}
          
            <BackePageComponente 
                        page="HomeFigmaTab1Screen"
                        title1='Vacunación'
                        title2='Exportar'
                        />
          
            
           
        </View>    
            
        <View style={styles.textBackground}>
            <TextInput
                placeholder='Buscar'
                style={{
                    ...styles.textInput,
                    top:(Platform.OS==='ios' ? 0 : 2)
                }}
                autoCapitalize='none'
                autoCorrect={ false }
                value={ textValue }
                onChangeText={ setTextValue }
            />
            <Icon
                name='search-outline'
                color='grey'
                size={ 30 }
            ></Icon>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
      //  backgroundColor:'red'
    },
    textBackground: {
           backgroundColor:'#F3F1F3',
           borderRadius:50,
           height:40,
           paddingHorizontal:20,
           justifyContent:'center',
           alignItems:'center',
           flexDirection:'row',
           shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
    },
    goBack: {
        //    borderRadius:50,
        //    height:40,
        //    paddingHorizontal:20,
           flex:1,
           justifyContent:'space-between',
           flexDirection:'row',
           marginBottom:10,
    },
    textInput:{
        flex:1,
        fontSize:18,
        top:2
    }

});