import React, { useContext } from 'react'
import { format } from 'date-fns';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Vaccine, Dosi } from '../interfaces/vaccine-withdosis-for-dependent-interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { MenuItem } from '../interfaces/appInterfaces';
 

interface Props {
    menuItem: Dosi | Vaccine;
    cerrarModal: (menuItem:Dosi | Vaccine) => void;
    propiedad?: 'parent' | 'child'
}

export const FlatListMenuVaccineDosis = ({ menuItem, cerrarModal, propiedad = 'parent'  }:Props) => {

  const {   dependent } =  useApplyVaccines();
  
  const enviar = (  menuItem: Dosi | Vaccine) => {
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
        {propiedad === 'parent' && (
                        <Text
                          onPress={() => enviar(menuItem)}
                          style={menuItem.isAlertApply ? styles.itemTextRed : styles.itemText}
                        >
                          {menuItem.name}
                        </Text>
                      )}

        {propiedad === 'child' && (
                       <View  style={{ flexDirection: 'row'}}>
                                <Text    onPress={menuItem.isApplied ? undefined : () => enviar(menuItem)}
                                    style={[
                                      styles.itemText,
                                    ]}
                                  >
                                  {menuItem.name}
                                </Text>
                                {menuItem.isApplied && ( <Text    onPress={menuItem.isApplied ? undefined : () => enviar(menuItem)}
                                                        style={[
                                                          styles.itemText,
                                                        ]}
                                                      >
                                                     {format(new Date(menuItem.vaccination_date), 'dd/MM/yyyy')}
                                                    </Text>) }
                                <View style={{ flex: 1 }}></View>

                                {/* Aqui colocamos el icono si es aplicado o no es aplicadop */}
                                {menuItem.isApplied ? (
                                                    <View style={{ marginLeft: Platform.OS === 'ios' ? 1 : 10,marginTop:-5 }}>
                                                      <Ionicons name="checkmark-done-circle-outline" size={40} color="black" />
                                                    </View>
                                                  )
                                                  :
                                                  (
                                                    <View style={{ marginLeft: Platform.OS === 'ios' ? 1 : 10,marginTop:-5 }}>
                                                      <Ionicons name="ellipse-outline" size={40} color={dependent.days_birth > menuItem.expires_in_days ? 'red' : 'black'} />
                                                    </View>
                                                  )}
                       </View>
                      )}
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
    },
    itemTextRed: {
        marginLeft: 10,
        fontSize: 19,
        color: 'red',
    }
})