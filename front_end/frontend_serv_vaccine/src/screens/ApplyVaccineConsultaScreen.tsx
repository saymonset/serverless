import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { ApplyVaccine, Dosiss } from '../interfaces';
import { getDosisById, geVaccinesById } from '../servicio/dosis-servicio';
import { Vaccine } from '../interfaces/vaccine-interfaces';
 

interface  Props {
    applyVaccine: ApplyVaccine
}


export const ApplyVaccineConsultaScreen = ( { applyVaccine }:Props) => {
    const { top } = useSafeAreaInsets();
    const { width:windowWidth } = Dimensions.get('window');
    let {  token  } = useApplyVaccines();

    const initialStateDosis: Dosiss = {}; // Inicializa la variable de estado dosis con el tipo Dosis
    const initialStateVaccine: Vaccine = {}; // Inicializa la variable de estado vaccine con el tipo Vaccine

    const {   dosis_id, image, lote, vaccination_date} = useSelector( (state: store ) => state.applyVaccineStore);
    const [ dosis, setDosiss ]  = useState<Dosiss>(initialStateDosis); // Especifica el tipo Dosis al utilizar useState
    const [vaccine, setVaccine ] = React.useState<Vaccine>(initialStateVaccine); // Especifica el tipo Vaccine al utilizar useState

 

     const getDosisWithVaccine = async() => {
      if (!dosis_id){ return }
        const datadosis = await getDosisById( dosis_id, token);
        setDosiss(datadosis)
      
      //    console.log(dosis);
          if (datadosis) {
            console.log( {datadosis })
           
            let { vacinne_id } = datadosis;   
            if (!vacinne_id){ return }

            let vaccine1: Vaccine = await geVaccinesById(vacinne_id , token);
            console.log(vaccine1)
            console.log('-------cool----');
            setVaccine(vaccine1)
             
          }
  
        return null;
     }
     useEffect(() => {
          getDosisWithVaccine();
     }, [])
     

  return (
    <View
          style={{
           
                  flex:1,
                  shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,

                    elevation: 10,
                }}    
    >
      <View
         style ={{...styles.marginContainer,
                      marginTop:top + 20,}}
      >
         <Text style = { styles.subTitle}>{ vaccine.name}+ ' ' + {dosis.name} </Text>
         <Text style = { styles.title}>{vaccine.name}+ ' ' + {dosis.name} </Text>
      </View>  
      
    
    </View>
  )
}
 

const styles = StyleSheet.create({
  marginContainer: {
      marginHorizontal: 20
  },
  subTitle : {
    fontSize:16,
    opacity: 0.8

  },
  title : {
    fontSize:20,
    fontWeight:'bold'
  }
});