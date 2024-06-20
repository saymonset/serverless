import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
 
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
 
import { useGender } from '../../../hooks/useGender';
import { useRelationShip } from '../../../hooks/useRelationShip';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { getDependentByPageAction } from '../../../../actions/dependents/get-dependents-by-pageAction.ts';
import { MainLayout } from '../../../layouts/MainLayout';
import { LoadingScreen } from '../../loading/LoadingScreen';
import { DependentList } from '../../../components/dependents/DependentList';
import { useLogin } from '../../../hooks/useLogin';
 



const screenWidth = Dimensions.get("window").width;

export const ApplyVaccinesDependentsScreen = () => {
  const { user } = useLogin();
    const { loadGender } =  useGender();
    const { loadRelationShip } =  useRelationShip();
    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');
    const queryClient = useQueryClient();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    useEffect(() => {
      termUpdate(term);
      queryClient.invalidateQueries({queryKey: ['applyvaccinedependents', 'infinite']});
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
      queryKey:['applyvaccinedependents', 'infinite'],
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
    
       <>
        <MainLayout
            title="Aplicar Vacuna"
            subTitle=""
            setTerm={( value )=>setTerm(value)}
            rightAction= { () => navigation.navigate('ApplyVaccinesAddScreen',{ dependentId: 'new' })}
            rightActionIcon="plus-outline"
            >
        {  ( isLoading ) 
              ?  (<LoadingScreen />)
              : <DependentList 
                      goPage="ApplyVaccinesAddScreen"
                      dependents={ data?.pages.flat() ?? [] }
                      fetchNextPage = { fetchNextPage }/> }
            
        </MainLayout>
        {/* <FAB 
        iconName="plus-outline"
        onPress={() => navigation.navigate('ApplyVaccinesAddScreen',{ dependentId: 'new' })}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
      /> */}
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
  