 
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { ApplyVaccine } from '../interfaces';
 



interface Props {
    applyVaccine: ApplyVaccine;
}

export const ApplyVaccineByDependentListComponent = ( { applyVaccine } : Props) => {

  let { handleByIdApplyVaccine  } = useApplyVaccines();
  const navigation = useNavigation();


   const edit = async (applyVaccine:ApplyVaccine) => {
      // Clocamos el id del dependiente en el store de apply vaccine y la bandera ee ediotar en trrue
      handleByIdApplyVaccine(applyVaccine);
      navigation.navigate("ApplyVaccinesDetailScreen" as never);
   }
 
   

  return (
     <View style={{ 
                    flexDirection: 'row', 
                    
                    alignItems: 'flex-start' }}>
           <TouchableOpacity
                onPress={ () => edit(applyVaccine) }
                activeOpacity={0.5}>
                  <View style={{ flexDirection: 'row'}}>
                      <View style={ {...styles.icon,
                                        marginLeft:(Platform.OS==='ios')?0:10}}>
                          <Icon name="eyedrop-outline" size={50} color={"black"} />
                      </View>    
                      <View style={{ marginLeft: 30, marginRight:80,}}>
                              <Text style={styles.strong}>{ 'Nombre: '+applyVaccine.dosis.vaccine.name }</Text>
                              {/* <Text style={styles.strong}>{'Previene: '+applyVaccine.dosis.vaccine.disease_prevents}</Text> */}
                              <Text style={styles.strong}>{'Descripción: '+applyVaccine.dosis.vaccine.description}</Text>
                              {/* <Text style={styles.strong}>{'Lote: '+applyVaccine.lote}</Text>
                              <Text style={styles.strong}>{'Fecha: '+applyVaccine.vaccination_date}</Text> */}
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
     
});