import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dosiss } from '../interfaces';
import { Pais } from '../interfaces/appInterfaces'
import { Vaccine } from '../interfaces/vaccine-interfaces';
 

interface Props {
    menuItem: Dosiss | Vaccine;
    cerrarModal: (menuItem:Dosiss | Vaccine) => void;
    propiedad?: 'parent' | 'child'
}

export const FlatListMenuVaccineDosis = ({ menuItem, cerrarModal, propiedad = 'parent'  }:Props) => {

  const enviar = (  menuItem: Dosiss | Vaccine) => {
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
        { propiedad === 'parent' && (<Text onPress={() => enviar(menuItem)} style = { styles.itemText}>{ menuItem.name }</Text>)} 
        { propiedad === 'child' && (<Text onPress={() => enviar(menuItem)} style = { styles.itemText}>{ menuItem.name }</Text>)} 
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