import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components'
import React, { useState } from 'react'
import { DependentList } from '../../../components/dependents/DependentList';
import { ConsultVaccineList } from '../../../components/vaccine/consult/ConsultVaccineList';
import { useConsultVaccine } from '../../../hooks/useConsultVaccine';
import { MainLayout } from '../../../layouts/MainLayout';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { LoadingScreen } from '../../loading/LoadingScreen';

export const ConsultVaccineDetailScreen = () => {
    let {   
        isLoading,
        vaccineuniqueFromTableData
     } = useConsultVaccine();

     const [ term, setTerm ] = useState('');

     const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
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
  )
}
