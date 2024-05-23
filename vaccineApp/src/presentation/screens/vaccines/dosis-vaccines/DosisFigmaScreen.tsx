import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useGender } from '../../../hooks/useGender';
import { useRelationShip } from '../../../hooks/useRelationShip';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '../../../layouts/MainLayout';
import { LoadingScreen } from '../../loading/LoadingScreen';
import { CreateEditVaccineList } from '../../../components/vaccine/consult/CreateEditVaccineList';
import { getDosisByVaccineByIdAction, getVaccineByIdAction, getVaccinesAction } from '../../../../actions/vaccines/createEditVaccinesAction';
import { CreateEditDosisList } from '../../../components/vaccine/dosis/CreateEditDosisList';
import { StackScreenProps } from '@react-navigation/stack';
import { VaccineByIDEntity } from '../../../../domain/entities/VaccineEditCreateEntity';
import { Text } from '@ui-kitten/components';
import { useVaccines } from '../../../hooks/useVaccines';
import { useDosis } from '../../../hooks/useDosis';
 



const screenWidth = Dimensions.get("window").width;
interface Props extends StackScreenProps<RootStackParams,'DosisFigmaScreen'>{};

export const DosisFigmaScreen = ({route}:Props) => {
    const { loadGender } =  useGender();
    const { loadRelationShip } =  useRelationShip();
    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');
    const vaccineIdRef = useRef(route.params.vaccineId);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { isLoading:isLoadingDosis, dosisDelete, getDosisByVaccine } = useDosis();
 
    const queryClient = useQueryClient();
    
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
             // dosisDelete(id);
             console.log(id);
              queryClient.invalidateQueries({queryKey: ['dosis', 'infinite']});
              refetch();
            },
          },
        ],
        { cancelable: false }
      );
    }

    // const {isLoading, data: dosis = []} = useQuery({
    //   queryKey: ['dosis_ids', 'infinite'],
    //   staleTime: 1000 * 60 * 60, // 1 hour
    //   //staleTime: 0, // no cache
     
    //   queryFn: async() => await getDosisByVaccineByIdAction(vaccineIdRef.current),
    // });
     
 
    const { isLoading, data, fetchNextPage, refetch } = useInfiniteQuery({
      queryKey:['dosis', 'infinite'],
      staleTime: 1000 * 60 * 60, // 1 hour
      initialPageParam: 0,
      queryFn: async ( params )=>  {
        const dosis = await getDosisByVaccine(vaccineIdRef.current);
        return dosis ?? [];
      },
      getNextPageParam: ( lastPage, allPages) => allPages.length,
      //refetchInterval:1000
    })

   

  return (
    
       <>
        <MainLayout
          //Este nombre se coloca apenas selecciones un dosis de la vacuna 
          //  title={"Dosis de cada Vacuna " + (nameVaccine? nameVaccine :  '')}
            title={"Dosis de cada Vacuna " }
            subTitle=""
            setTerm={( value )=>setTerm(value)}
            rightAction= { () => navigation.navigate('DosisEditCreateScreen',{ dosisId: 'new' })}
            rightActionIcon="plus-outline"
            >
        {  ( isLoading ) 
              ?  (<LoadingScreen />)
              : <CreateEditDosisList 
                      onDelete={ (idDelete)=> deleteRow(idDelete)}
                      goPage="DosisEditCreateScreen"
                      dosis={   data?.pages.flat() ?? [] }
                      /> }
            
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

 
  