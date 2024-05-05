import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../loading/LoadingScreen';
import { getDependentByPageAction } from '../../../actions/dependents/get-dependents-by-pageAction.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { DependentList } from '../../components/dependents/DependentList';
import { Layout } from '@ui-kitten/components';
import { useGender } from '../../hooks/useGender';
import { useRelationShip } from '../../hooks/useRelationShip';



const screenWidth = Dimensions.get("window").width;

export const PerfilesFigmaScreen = () => {
    const { loadGender } =  useGender();
    const { loadRelationShip } =  useRelationShip();
    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');
    const navigation = useNavigation();

    const dispatch = useDispatch();

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


     
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
      queryKey:['dependents', 'infinite'],
      staleTime: 1000 * 60 * 60, // 1 hour
      initialPageParam: 0,
      queryFn: async ( params )=>  {
        const dependents = await getDependentByPageAction(10000,params.pageParam);
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
            title="Vaccines"
            subTitle="Aplicación vaccines"
            setTerm={( value )=>setTerm(value)}
            rightAction= { () => {}}
            rightActionIcon="plus-outline"
            >
          
        {  ( isLoading ) 
              ?  (<LoadingScreen />)
              : <DependentList 
                      dependents={ data?.pages.flat() ?? [] }
                      fetchNextPage = { fetchNextPage }/> }
            
        </MainLayout>
    
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
  