import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
 
import { useInfiniteQuery } from '@tanstack/react-query';
 
import { useGender } from '../../../hooks/useGender';
import { useRelationShip } from '../../../hooks/useRelationShip';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { getDependentByPageAction } from '../../../../actions/dependents/get-dependents-by-pageAction.ts';
import { MainLayout } from '../../../layouts/MainLayout';
import { LoadingScreen } from '../../loading/LoadingScreen';
import { DependentList } from '../../../components/dependents/DependentList';
import { useConsultVaccine } from '../../../hooks/useConsultVaccine';
import { Layout, List } from '@ui-kitten/components';
import { ConsultDosisCard } from '../../../components/vaccine/consult/ConsultDosisCard';
import { StackScreenProps } from '@react-navigation/stack';
import { ApplyVaccine } from '../../../../infrastructure/interfaces/consult-vaccine-response';
import { ConsultDosisList } from '../../../components/vaccine/consult/ConsultDosisList';
 



interface Props extends StackScreenProps<RootStackParams,'ConsultDosisDetailScreen'>{};

export const ConsultDosisDetailScreen = ({ route }:Props) => {
    const [ term, setTerm ] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { byDependentApplyVaccines } = useConsultVaccine();
    const [appliedVaccinesDosis, setAppliedVaccinesDosis] = useState<ApplyVaccine[]>([]);
    const vaccineId = useRef(route.params.vaccineId);

    const dispatch = useDispatch();
     
    
    useEffect(() => {
      console.log(JSON.stringify(byDependentApplyVaccines));
      //Filtrar los elementos de applyVaccinesUniqByIds que coinciden con el appliedVaccineId específico
      const filteredApplyVaccines = byDependentApplyVaccines.filter((item) => item.dosis.vaccine._id.$oid === vaccineId.current);

      setAppliedVaccinesDosis(filteredApplyVaccines);
    }, [vaccineId.current])
    

   return (
    
    <>
    <MainLayout
              title="Consultar Dosis"
              subTitle=""
              setTerm={( value )=>setTerm(value)}
              >
            
            <ConsultDosisList
            applyvaccines ={ appliedVaccinesDosis } 
                      /> 
              
    </MainLayout>
  
    
  </>
   

        
    
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
  