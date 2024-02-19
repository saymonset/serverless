import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import {   Button, Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {  LIMITE_PAGE, NextPrevioPage } from '../interfaces';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from './LoadingScreen';
import { SearchInputComponent } from '../components/SearchInputComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { useLogin } from '../hooks/useLogin';
import { ApplyVaccineByDependentListComponent } from '../components/ApplyVaccineByDependentListComponent';
import { ApplyVaccinesDetailScreen } from './ApplyVaccinesDetailScreen';
import { ApplyVaccinesVaccineDetailScreen } from './ApplyVaccinesVaccineDetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';



const screenWidth = Dimensions.get("window").width;

export const ApplyVaccineConsultaScreen =  () => {
         
  let { loadVaccineAppliedByDependent, dependent_id,  isLoading,
              isConsultVaccineForDosis,
              onLoadbyDosisOff } = useApplyVaccines();
            const { top } = useSafeAreaInsets();
            const navigation = useNavigation();

            let keyCounter = 0;

            const { token } = useLogin();

         
       
          useEffect(() => {
            let desde = 0;
            let limite = LIMITE_PAGE;
            /*** Aqui llnamos todas las vacunas aplicadas por el dependiente */
            loadVaccineAppliedByDependent({
              limite,
              desde
            }, 1, {
              nextPage: 'none'
            }, token, dependent_id)
            
          }, [])
          

          const onBack = async () => {
            if (isConsultVaccineForDosis){
              onLoadbyDosisOff();
            }else{
              navigation.navigate('ApplyVaccinesDependentsScreen' as never)
            }
           
          }
           
  return (
    <View style={styles.container}>
    <View style={[styles.card, { marginTop: 20, marginBottom: (Platform.OS==='ios') ? 10 : 0 }]}>
       <View style = {{ ... styles.globalMargin,
                     alignItems:'center',
                     flex:1, 
                     marginRight: 0,
                     backgroundColor:'white'}}>
                  

                

                 <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: 0,
                    marginLeft: 15,
                    marginHorizontal: 1,
                    marginTop: (Platform.OS === 'ios') ? 0 : 0
                  }}>
                    <TouchableOpacity onPress={() => onBack()} style={{ marginTop: 0, marginRight:320 }}>
                      <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                    </TouchableOpacity>
                  </View>       
                 {  ( isLoading ) ? <LoadingScreen /> :
                <>
                   
                   <View style={{
                     flex:1,
                  }}>
                    {/* COSULTA  VACUNA: */}
                      { !isConsultVaccineForDosis &&  <ApplyVaccinesVaccineDetailScreen/>}

                      {/* COONSULTAR  VACUNA Y DETALLES DE  DOSIS */}
                      { isConsultVaccineForDosis && <ApplyVaccinesDetailScreen/>}
                      </View>
                </>
               } 

              
                
       </View>
      </View>
  </View>
  )
}



export const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 2,
  },
  card: {
    flex: 1,
    //backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  globalMargin: {
    marginHorizontal: 0,
    alignItems:'center',
    justifyContent:'center',
    flex:1, 
    backgroundColor:'white'
  },
  title: {
      fontSize: 35,
      fontWeight: 'bold'
  },
  search: {
    flexDirection:'row',  
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal:10
  }
});
