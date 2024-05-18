import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components'
import React, { useState } from 'react'
import { DependentList } from '../../../components/dependents/DependentList';
import { FAB } from '../../../components/ui/FAB';
import { ConsultVaccineList } from '../../../components/vaccine/consult/ConsultVaccineList';
import { useConsultVaccine } from '../../../hooks/useConsultVaccine';
import { useExportar } from '../../../hooks/useExportar';
import { MainLayout } from '../../../layouts/MainLayout';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { LoadingScreen } from '../../loading/LoadingScreen';

interface Props {
  dependent_id: string;
}
export const ConsultVaccineDetailScreen = ({ dependent_id }:Props) => {
    let {isLoading, vaccineuniqueFromTableData } = useConsultVaccine();
    const { exportVaccineAppliedByDependent } = useExportar();

     const [ term, setTerm ] = useState('');

     const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <MainLayout
                title="Concultar Vacunas"
                subTitle=""
                setTerm={( value )=>setTerm(value)}
                rightAction= { () => navigation.navigate('ConsultVaccinesScreen',{ dependentId: 'new' })}
                rightActionIcon="plus-outline"
                >
              
            {  ( isLoading ) 
                  ?  (<LoadingScreen />)
                  : <ConsultVaccineList 
                          goPage="vaccine"
                          applyVaccine={ vaccineuniqueFromTableData ?? [] }
                        /> }
                
      </MainLayout>
    
     <FAB 
        iconName="plus-outline"
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
