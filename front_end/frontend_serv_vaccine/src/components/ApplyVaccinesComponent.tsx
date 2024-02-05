 
import React  from 'react'
import {  StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { PerfilFigma } from '../interfaces/perfil-figma-interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApplyVaccines } from '../hooks/useApplyVaccines';

interface Props {
    obj: PerfilFigma;
    applyVaccinePerson: (id:string) => void;
}

export const ApplyVaccinesComponent = ( { obj, applyVaccinePerson } : Props) => {
  let { isConsultVaccine, isAddApplyVaccine } = useApplyVaccines();
  return (
     <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
           <TouchableOpacity
                onPress={ () => applyVaccinePerson(obj._id) }
                activeOpacity={0.5}>
                  <View style={{ flexDirection: 'row'}}>
                      <View style={{ marginLeft: 0 }}>
                              <Text style={styles.strong}>{ obj.name + ' ' + obj.lastname}</Text>
                              <Text style={styles.name}>{'Perfil ' + (obj.isUser?'Primario':'Secundario')}</Text>
                      </View>
                  </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <View style={{  marginLeft:(Platform.OS==='ios')?1:10}}>
                <TouchableOpacity onPress={
                              () => {
                                applyVaccinePerson(obj._id)
                              }
                              }>
                                
                   { isAddApplyVaccine &&   <Ionicons name="eyedrop-outline" size={50} color="black" />  }
                   { isConsultVaccine &&   <Ionicons name="medkit-outline" size={50} color="black" />  }
                </TouchableOpacity>
            </View>
           
           
      </View>
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