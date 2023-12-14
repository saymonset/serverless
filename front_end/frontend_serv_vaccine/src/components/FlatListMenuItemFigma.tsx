import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pais } from '../interfaces/appInterfaces'
 

interface Props {
    menuItem: Pais;
    cerrarModal: (menuItem:Pais) => void;
    propiedad?: 'estado' | 'municipio'
}

export const FlatListMenuItemFigma = ({ menuItem, cerrarModal, propiedad = 'estado'  }:Props) => {

  const enviar = (  menuItem: Pais) => {
    cerrarModal(menuItem);
  }

  return (
    <TouchableOpacity
      style={ styles.container}
       activeOpacity={0.8}
       onPress = { () => {
            enviar( menuItem );
       }
    }
      >
        { propiedad === 'estado' && (<Text onPress={() => enviar(menuItem)} style = { styles.itemText}>{ menuItem.capital }-{ menuItem.estado }</Text>)} 
        { propiedad === 'municipio' && (<Text onPress={() => enviar(menuItem)} style = { styles.itemText}>{ menuItem.capital }-{ menuItem.municipio }</Text>)} 
            {/* <View style = {{ flex: 1 }} /> */}
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom:10,
    },
    itemText: {
        marginLeft: 10,
        fontSize: 19,
        color: 'black',
    }
})