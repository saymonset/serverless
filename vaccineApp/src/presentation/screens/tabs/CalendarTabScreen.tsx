import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
 
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useLogin } from '../../hooks/useLogin';
import { useGender } from '../../hooks/useGender';
import { useRelationShip } from '../../hooks/useRelationShip';
import { RootStackParams } from '../../navigation/StackNavigator';
import { getDependentByPageAction } from '../../../actions/dependents/get-dependents-by-pageAction.ts';
import { MainLayout } from '../../layouts/MainLayout';
import { LoadingScreen } from '../loading/LoadingScreen';
import { DependentList } from '../../components/dependents/DependentList';
 
 
export const CalendarTabScreen = () => {
  const { user } = useLogin();
  const { loadGender } =  useGender();
  const { loadRelationShip } =  useRelationShip();
  const { top } = useSafeAreaInsets();
  const [ term, setTerm ] = useState('');
  const queryClient = useQueryClient();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    termUpdate(term);
    queryClient.invalidateQueries({queryKey: ['calendardependents', 'infinite']});
    refetch();
}, [term])  

const termUpdate = (termino:string = "''"):string => {
     if (termino){
        if (termino.length === 0 ) {
          setTerm("''");
        }else{
          setTerm(termino);
        }
     } 
      return term;
}



  const addFamily = async ()=> {
      navigation.navigate( 'PerfilFigmaAddScreen' as never)
  }
  const deleteRow = ( id: string)=>{
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro que deseas eliminar este elemento?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: () => {
             
            },
          },
        ],
        { cancelable: false }
      );
  }


   
  const { isLoading, data, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey:['calendardependents', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    queryFn: async ( params )=>  {
      const dependents = await getDependentByPageAction(10000,params.pageParam, termUpdate(),user!);
      return dependents;
    },
    getNextPageParam: ( lastPage, allPages) => allPages.length,
  })

  // useEffect(() => {
  

  // }, [])
  useEffect(() => {
    loadGender();
    loadRelationShip();
   }, []);
   
  return (
    <MainLayout
          title="Calendario"
          subTitle=""
          setTerm={( value )=>setTerm(value)}
          >
      {  ( isLoading ) 
            ?  (<LoadingScreen />)
            : <DependentList 
                    goPage="CalendarVaccineByDependentScreen"
                    dependents={ data?.pages.flat() ?? [] }
                    fetchNextPage = { fetchNextPage }/> }
    
  </MainLayout>
     
  )
}

