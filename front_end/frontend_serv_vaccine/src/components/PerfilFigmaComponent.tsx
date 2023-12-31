import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PerfilFigma } from '../interfaces/perfil-figma-interfaces';

const windowWidth = Dimensions.get('window').width;

interface Props {
    obj: PerfilFigma;
}

export const PerfilFigmaComponent = ( { obj } : Props) => {

     
  return (
    <TouchableOpacity activeOpacity={0.9}>
     <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={ {...styles.icon,
                              marginLeft:(Platform.OS==='ios')?0:10}}>
                <Icon name={obj.icon} size={50} color={"black"} />
            </View>    
            <View style={{ marginLeft: 30 }}>
                  
                    <Text style={styles.strong}>{ obj.name + ' ' + obj.lastname}</Text>
                    <Text style={styles.name}>{'Perfil ' + obj.isUser?'Primario':'Secundario'}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
      </View>
  </TouchableOpacity>
  
  )
}


// 


const styles = StyleSheet.create({
   
    strong: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
       // left: 20
    },
    name: {
        color: 'black',
       // fontSize: 20,
       // fontWeight: 'bold',
      //  left: 20
    },
    blue: {
        color: 'blue',
       // fontSize: 20,
        fontWeight: 'bold',
      //  left: 20
    },
    icon: {
        left:0,
        top:0,
        justifyContent:'center', 
        alignItems:'center' ,
        width:60, 
        height:60,  
        borderRadius:10,
        backgroundColor:  'rgba(173, 216, 230, 0.2)'
    },
     
});