 
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import {  Dosi } from '../interfaces';
 



interface Props {
    dosis: Dosi;
    goPage: (dosis: Dosi | null) => void;
}

export const ApplyVaccineDosisByDependent = ( { dosis, goPage } : Props) => {

  let { isConsultVaccineForDosis, vaccine } = useApplyVaccines();

 

   let edit = async (dosis:Dosi) => {
      // Clocamos el id del dependiente en el store de apply vaccine y la bandera ee ediotar en trrue
      goPage( null)
   }
 
   

  return (
     <View style={{ 
                    flexDirection: 'row', 
                    
                    alignItems: 'flex-start' }}>
           <TouchableOpacity
                onPress={ () => edit(dosis) }
                activeOpacity={0.5}>
                  <View style={{ flexDirection: 'row'}}>
                      <View style={ {...styles.icon,
                                        marginLeft:(Platform.OS==='ios')?0:10}}>
                          <Icon name="eyedrop-outline" size={50} color={"black"} />
                      </View>    
                      <View style={{ marginLeft: 30, marginRight:80,}}>
                        
                             <Text style={[styles.title, { color: dosis.isApplied ? 'green' : 'orange' }]}>
                                {'Nombre: ' + vaccine.name}
                                </Text>
                             { !isConsultVaccineForDosis && <Text style={styles.subTitle}>{'Previene: '+vaccine.disease_prevents}</Text>}     
                              { !isConsultVaccineForDosis &&  <Text style={styles.subTitle}>{'Descripción: '+vaccine.description}</Text>}    

                              { isConsultVaccineForDosis && <Text style={styles.subTitle}>{'Dosis: '+dosis.name}</Text>}     
                              { isConsultVaccineForDosis &&  <Text style={styles.subTitle}>{'Lote: '+dosis.lote}</Text>}     
                              { isConsultVaccineForDosis && <Text style={styles.subTitle}>{'Fecha: '+dosis.vaccination_date}</Text>}     
                              { isConsultVaccineForDosis && <Text style={styles.subTitle}>{'Frecuencia: '+dosis.age_frequency}</Text>}    
                              
                              
                      </View>
                  </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
             
           
           
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
    subTitle :{
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
     
});