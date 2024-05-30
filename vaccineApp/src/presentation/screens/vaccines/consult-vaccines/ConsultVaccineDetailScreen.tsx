import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { DependentList } from '../../../components/dependents/DependentList';
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
    const { isLoading, loadVaccineAppliedByDependent } = useConsultVaccine();



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
                setTerm={( value )=>setTerm(value)}
                // rightAction= { () => navigation.navigate('ConsultVaccinesScreen',{ dependentId: 'new' })}
                // rightActionIcon="plus-outline"
                >
              
            {  ( isLoading ) 
                  ?  (<LoadingScreen />)
                  : <ConsultVaccineList 
                        /> }
                
      </MainLayout>
    
     <FAB 
        iconName="attach-2-outline"
        onPress={() => exportVaccineAppliedByDependent ( dependent_id)}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
      />
    </>
  
  )
}
