import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../loading/LoadingScreen';
import { getDependentByPageAction } from '../../../actions/dependents/get-dependents-by-pageAction.ts';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { DependentList } from '../../components/dependents/DependentList';
import { Layout } from '@ui-kitten/components';
import { useGender } from '../../hooks/useGender';
import { useRelationShip } from '../../hooks/useRelationShip';
import { FAB } from '../../components/ui/FAB';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useDependent } from '../../hooks/useDependent';
import { Dependent } from '../../../infrastructure/interfaces/dependent-interface';
import { useLogin } from '../../hooks/useLogin';



const screenWidth = Dimensions.get("window").width;

export const DependentsMainScreen = () => {
    const { user } = useLogin();
    const { loadGender } =  useGender();
    const { loadRelationShip } =  useRelationShip();
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const {  dependentDelete} =  useDependent();
    const [ term, setTerm ] = useState('');
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

  
 
    

     
     // Lógica para eliminar un elemento
     const handleDelete = async (id: string, dependents:Dependent[]) => {
            // Lógica para eliminar el elemento con el ID proporcionado
            // Por ejemplo, realizar una solicitud al servidor para eliminar el elemento en la base de datos
            const updatedDependents = dependents.filter((depend) => depend._id.$oid !== id);
            // Utiliza el operador spread (...) para actualizar la referencia de dependents
            dependents.splice(0, dependents.length, ...updatedDependents);
            // Después de la eliminación exitosa, refrescar los datos utilizando fetchNextPage
           
            refetch();
           
            return dependents;
     };
     

          const deleteRow = ( id: string, dependents:Dependent[])=>{
                
            Alert.alert(
              'Confirmar eliminación',
              //'¿Estás seguro que deseas eliminar a ' +  dependent.name + ' ' + dependent.lastname,
              '¿Estás seguro que deseas eliminarlo ? '  ,
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
                    dependentDelete(id);
                    queryClient.invalidateQueries({queryKey: ['dependents', 'infinite']});
                 
                    handleDelete(id, dependents);
                    
                  },
                },
              ],
              { cancelable: false }
            );
          }


     
    const { isLoading, data, fetchNextPage, refetch } = useInfiniteQuery({
      queryKey:['dependents', 'infinite'],
      staleTime: 1000 * 60 * 60, // 1 hour
      initialPageParam: 0,
      queryFn: async ( params )=>  {
        const dependents = await getDependentByPageAction(10000,params.pageParam, termUpdate(), user!);
        return dependents;
      },
      getNextPageParam: ( lastPage, allPages) => allPages.length,
      //refetchInterval:1000
    })

  
    useEffect(() => {
      loadGender();
      loadRelationShip();
     }, []);

  return (
    
       <>
        <MainLayout
            title="Perfiles"
            subTitle=""
            setTerm={( value )=> setTerm(value)}
            rightAction= { () => navigation.navigate('DependentAddEditScreen',{ dependentId: 'new' })}
            rightActionIcon="plus-outline"
            >
          
        {  ( isLoading ) 
              ?  (<LoadingScreen />)
              : <DependentList 
                      onDeleteRow  = { (idRowDelete) => deleteRow(idRowDelete, data?.pages.flat() ?? []) }
                      goPage="DependentAddEditScreen"
                      dependents={  data?.pages.flat() ?? [] }
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
  