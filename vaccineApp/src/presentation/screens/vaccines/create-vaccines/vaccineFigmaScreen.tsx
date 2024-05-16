import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useGender } from '../../../hooks/useGender';
import { useRelationShip } from '../../../hooks/useRelationShip';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../../layouts/MainLayout';
import { LoadingScreen } from '../../loading/LoadingScreen';
import { CreateEditVaccineList } from '../../../components/vaccine/consult/CreateEditVaccineList';
import { getVaccinesAction } from '../../../../actions/vaccines/createEditVaccinesAction';
 



const screenWidth = Dimensions.get("window").width;

export const VaccineFigmaScreen = () => {
    const { loadGender } =  useGender();
    const { loadRelationShip } =  useRelationShip();
    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
      queryKey:['vaccines', 'infinite'],
      staleTime: 1000 * 60 * 60, // 1 hour
      initialPageParam: 0,
      queryFn: async ( params )=>  {
        const vaccines = await getVaccinesAction(10000,params.pageParam);
        return vaccines;
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
            title="Vacunas"
            subTitle=""
            setTerm={( value )=>setTerm(value)}
            rightAction= { () => navigation.navigate('VaccineEditCreateScreen',{ vaccineId: 'new' })}
            rightActionIcon="plus-outline"
            >
          
        {  ( isLoading ) 
              ?  (<LoadingScreen />)
              : <CreateEditVaccineList 
                      goPage="VaccineEditCreateScreen"
                      vaccines={ data?.pages.flat() ?? [] }
                      fetchNextPage = { fetchNextPage }/> }
            
        </MainLayout>
        {/* <FAB 
        iconName="plus-outline"
        onPress={() => navigation.navigate('DependentScreen',{ dependentId: 'new' })}
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
  