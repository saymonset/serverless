import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useGender } from '../../../hooks/useGender';
import { useRelationShip } from '../../../hooks/useRelationShip';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '../../../layouts/MainLayout';
import { LoadingScreen } from '../../loading/LoadingScreen';
import { CreateEditVaccineList } from '../../../components/vaccine/consult/CreateEditVaccineList';
import { getVaccinesAction } from '../../../../actions/vaccines/createEditVaccinesAction';
import { useVaccines } from '../../../hooks/useVaccines';
 



const screenWidth = Dimensions.get("window").width;

export const VaccineFigmaScreen = () => {
   
    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const {  vaccineDelete, getVaccinesAllBD} = useVaccines();
    const queryClient = useQueryClient();

    useEffect(() => {
      termUpdate(term);
      queryClient.invalidateQueries({queryKey: ['dependents', 'infinite']});
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

   
    const deleteRow = ( id: string)=>{
      Alert.alert(
        'Confirmar eliminación',
        //'¿Estás seguro que deseas eliminar a ' +  dependent.name + ' ' + dependent.lastname,
        '¿Estás seguro que deseas eliminarlo? '  ,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: () => {
              // Lógica para eliminar el elemento
              vaccineDelete(id);
              queryClient.invalidateQueries({queryKey: ['vaccines', 'infinite']});
              refetch();
            },
          },
        ],
        { cancelable: false }
      );
    }


    const { isLoading, data, fetchNextPage, refetch } = useInfiniteQuery({
      queryKey:['vaccines', 'infinite'],
      staleTime: 1000 * 60 * 60, // 1 hour
      initialPageParam: 0,
      queryFn: async ( params )=>  {
        const vaccines = await getVaccinesAllBD(10000,params.pageParam, termUpdate());
        return vaccines;
      },
      getNextPageParam: ( lastPage, allPages) => allPages.length,
      //refetchInterval:1000
    })
   
 

  return (
    
       <>
        <MainLayout
            title="Vacunas"
            subTitle=""
            setTerm={( value )=>setTerm(value)}
            rightAction= { () => navigation.navigate('VaccineEditCreateScreen',{ vaccineId: 'new' })}
            rightActionIcon="plus-outline"
            >
          
        {  ( isLoading ) 
              ?  (<LoadingScreen />)
              : <CreateEditVaccineList 
                      onDelete = {(id) => deleteRow(id) }
                      goPage="VaccineEditCreateScreen"
                      vaccines={ data?.pages.flat() ?? [] }
                      fetchNextPage = { fetchNextPage }/> }
            
        </MainLayout>
        {/* <FAB 
        iconName="plus-outline"
        onPress={() => navigation.navigate('DependentAddEditScreen',{ dependentId: 'new' })}
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
  