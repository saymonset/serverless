 
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PerfilFigma } from '../interfaces/perfil-figma-interfaces';
import { Dependent } from '../interfaces/dependent-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useDependent } from '../hooks/useDependent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { ApplyVaccine } from '../interfaces';
import { RootStackParams } from '../navigator/navigator';
 



interface Props {
    applyVaccine: ApplyVaccine;
    applyVaccinePerson: (id:string) => void;
}

export const ApplyVaccListarDosisByDependienteComponent = ( { applyVaccine, applyVaccinePerson } : Props) => {

  const dispatch = useDispatch();

  const {  usuario:{ token }  } = useSelector((state: store) => state.loginStore);
  let { handleByIdApplyVaccine  } = useApplyVaccines();
  let { tableData  } = useApplyVaccines();
  const navigation = useNavigation();


   const edit = async (applyVaccine:ApplyVaccine) => {
      // Clocamos el id del dependiente en el store de apply vaccine y la bandera ee ediotar en trrue
      handleByIdApplyVaccine({...applyVaccine});
      navigation.navigate("ApplyVaccineConsultaScreen" as never);
   }
 
   

  return (
  <>
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
                              <Text style={styles.strong}>{ 'Persona = '+applyVaccine.dependent_id }</Text>
                              <Text style={styles.strong}>{'Dosis = '+  applyVaccine.vaccination_date}</Text>
                              <Text style={styles.strong}>{'Fecha= '+  applyVaccine.vaccination_date}</Text>
                              <Text style={styles.name}>{'lote ' + applyVaccine.lote}</Text>
                      </View>
                  </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
             
           
           
      </View>
 </>
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