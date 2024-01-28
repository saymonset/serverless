 
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PerfilFigma } from '../interfaces/perfil-figma-interfaces';
import { Dependent } from '../interfaces/dependent-interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useDependent } from '../hooks/useDependent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
 



interface Props {
    obj: PerfilFigma;
    applyVaccinePerson: (id:string) => void;
}

export const ApplyVaccinesComponent = ( { obj, applyVaccinePerson } : Props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {  usuario:{ token }  } = useSelector((state: store) => state.loginStore);

  //const iniForm =  {name:'', lastname:'', phone:'', email:'', birth: new Date(), gender_id:'', status:true}
  const {  dependentById, editFalseDependent } = useDependent();

  let { isEdit } = useSelector( (state: store ) => state.dependentStore);
  
   const edit = async (dependent: Dependent) => {
    // await  updateRowFigma(dependent._id+'', token);
     // useDependent();
     const id = dependent._id+'';
     dependentById( id, token );
   }

   useEffect(() => {
    // Actualizar el estado del formulario usando el método 'onChange'
    
     if (isEdit){
        editFalseDependent();
         navigation.navigate( 'PerfilFigmaAddScreen' as never);
     }
   }, [isEdit])
   

  return (
  <>
     <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
           <TouchableOpacity
                onPress={ () => edit(obj) }
                activeOpacity={0.5}>
                  <View style={{ flexDirection: 'row'}}>
                      <View style={ {...styles.icon,
                                        marginLeft:(Platform.OS==='ios')?0:10}}>
                          <Icon name={obj.icon} size={50} color={"black"} />
                      </View>    
                      <View style={{ marginLeft: 30 }}>
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
                       <Ionicons name="eyedrop-outline" size={50} color="black" /> 
                </TouchableOpacity>
            </View>
           
           
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