import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { FAB } from '../../../components/ui/FAB';
import { ConsultVaccineList } from '../../../components/vaccine/consult/ConsultVaccineList';
import { useConsultVaccine } from '../../../hooks/useConsultVaccine';
import { useExportar } from '../../../hooks/useExportar';
import { useVaccines } from '../../../hooks/useVaccines';
import { MainLayout } from '../../../layouts/MainLayout';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { LoadingScreen } from '../../loading/LoadingScreen';

interface Props {
  dependent_id: string;
}
export const ConsultVaccineDetailScreen = ({ dependent_id }:Props) => {
    
    const { exportVaccineAppliedByDependent } = useExportar();
    const { getVaccines, isLoading:isLoadingVaccine } = useVaccines();
    const { isLoading, loadVaccineAppliedByDependent, applyVaccinesUniqByIds } = useConsultVaccine();


  useEffect(() => {
    //CARGA TODAS LAS VACUNAS DEL FAMILIAR
    loadVaccineAppliedByDependent( dependent_id );
    //getVaccines(dependent_id);

  }, [ dependent_id ])
  
  

     const [ term, setTerm ] = useState('');

     const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      
      <MainLayout
                title="Consultar Vacunas"
                subTitle=""
                //setTerm={( value )=>setTerm(value)}
                // rightAction= { () => navigation.navigate('ConsultVaccinesScreen',{ dependentId: 'new' })}
                // rightActionIcon="plus-outline"
                >
              
            {  ( isLoading ) 
                  ?  (<LoadingScreen />)
                  : <ConsultVaccineList 
                        /> }

            

              { ( !applyVaccinesUniqByIds || applyVaccinesUniqByIds.length <= 0) && (
                                                              <View style={styles.alternativeContainer}> 
                                                                    <Text
                                                                      style={styles.text}
                                                                      appearance='alternative'
                                                                    >
                                                                      No se ha encontrado ningún registro
                                                                    </Text>
                                                              </View>
                )}
              { ( applyVaccinesUniqByIds && applyVaccinesUniqByIds.length > 0) && (
                                                                  <FAB 
                                                                      iconName="attach-2-outline"
                                                                      onPress={() => exportVaccineAppliedByDependent ( dependent_id)}
                                                                      style={{
                                                                        position: 'absolute',
                                                                        bottom: 30,
                                                                        right: 20,
                                                                      }}
                                                                    />  
                )}
                
      </MainLayout>
   
    </>
  
  )
}



const styles = StyleSheet.create({
      text: {
        margin: 2,
      },
      alternativeContainer: {
        borderRadius: 4,
        marginVertical: 2,
        backgroundColor: '#3366FF',
      },
});